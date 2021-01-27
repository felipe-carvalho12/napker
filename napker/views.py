import base64
import uuid

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core.files.base import ContentFile

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.conf import settings

from django.http import JsonResponse
from django.shortcuts import render, redirect, reverse

from profiles.models import Profile, Interest, InterestSet

@api_view(['POST'])
def login_view(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response('logged in')
    else:
        return Response('Credenciais inválidas. Por favor verifique seus dados e tente novamente.')


def logout_view(request):
    logout(request)
    return redirect('/login')


@api_view(['POST'])
def signup_view(request):
    first_name = request.data['first-name']
    last_name = request.data['last-name']
    username = request.data['username']
    email = request.data['email']
    birth_date = request.data['birth-date']
    password = request.data['password']
    passwordc = request.data['passwordc']

    if password != passwordc:
        return Response('As senhas devem ser iguais.')
    if User.objects.filter(username=username).exists():
        return Response('Nome de usuário indisponível.')
    if Profile.objects.filter(email=email, user__is_active=True).exists():
        return Response('Email já utilizado.')

    try:
        user = User.objects.create(username=username)
        user.set_password(password)
        user.is_active = False
        user.save()
        profile = Profile.objects.get(user=user)
        profile.first_name = first_name
        profile.last_name = last_name
        profile.email = email
        profile.birth_date = birth_date
        profile.save()
    except:
        return Response('Informações inválidas!')

    return Response({
        'message': 'account created',
        'userId': user.id
    })


@api_view(['POST'])
def add_interests_view(request):
    user = User.objects.get(id=request.data['uid'])
    profile = Profile.objects.get(user=user)
    interests = []
    
    for title in request.data['public_interests']:
        if len(title) < 3:
            continue
        public_i, created = Interest.objects.get_or_create(title=title.lower(), public=True)
        interests.append(public_i)

    for title in request.data['private_interests']:
        if len(title) < 3:
            continue
        private_i, created = Interest.objects.get_or_create(title=title.lower(), public=False)
        interests.append(private_i)
    
    try:
        interest_set = InterestSet.objects.get(interests=interests)
    except:
        interest_set = InterestSet.objects.create()
        interest_set.interests.set(interests)
        interest_set.save()

    profile.interest_set = interest_set
    profile.save()

    current_site = get_current_site(request)
    email_subject = 'Ative a sua conta'
    message = render_to_string('auth/activate.html', {
        'user': user,
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': PasswordResetTokenGenerator().make_token(user)
    })
    email_message = EmailMessage(
        email_subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.profile.email],

    )
    email_message.send(fail_silently=False)

    return Response('activation link sent')


def activate_account_view(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception:
        user = None
    if user is not None and PasswordResetTokenGenerator().check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        return redirect('/home')
    else:
        return render(request, 'auth/activation_failed.html')


@api_view(['POST'])
def update_profile(request):
    profile = request.user.profile

    if len(request.data['profile-photo']):
        format, imgstr = request.data['profile-photo'].split(';base64,') 
        img_format = format.split('/')[-1] 
        photo = ContentFile(base64.b64decode(imgstr), name=profile.user.username + img_format)
    else:
        photo = profile.photo

    first_name = request.data['first-name'] if len(request.data['first-name']) else profile.first_name
    last_name = request.data['last-name'] if len(request.data['last-name']) else profile.last_name
    username = request.data['username'] if len(request.data['username']) else profile.user.username
    birth_date = request.data['birth-date'] if len(request.data['birth-date']) else profile.birth_date
    bio = request.data['bio'] if len(request.data['bio']) else profile.bio

    if User.objects.filter(username=username).exclude(profile=profile).exists():
        return Response('Nome de usuário indisponível')
    
    if len(first_name) > 50:
        return Response('Servidor custa caro! (:')

    if len(last_name) > 50:
        return Response('Servidor custa caro! (:')

    if len(username) > 50:
        return Response('Servidor custa caro! (:')

    if len(bio) > 240:
        return Response('Servidor custa caro! (:')

    profile.photo = photo
    profile.first_name = first_name
    profile.last_name = last_name
    profile.user.username = username
    profile.birth_date = birth_date
    profile.bio = bio
    profile.user.save()
    profile.save()

    return Response('profile updated')


@api_view(['POST'])
def reset_password(request):
    email = request.data['email']
    if not Profile.objects.filter(email=email).exists():
        return Response('Não existe nenhuma conta ligada a esse email!')
    profile = Profile.objects.get(email=email, user__is_active=True)
    user = profile.user
    current_site = get_current_site(request)
    email_subject = 'Recupere a sua senha'
    message = render_to_string('reset_password/email_message.html', {
    'user': user,
    'domain': current_site.domain,
    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
    'token': PasswordResetTokenGenerator().make_token(user)
    })
    email_message = EmailMessage(
        email_subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.profile.email],
    )
    email_message.send(fail_silently=False)
    return Response('email sent')


def reset_password_confirm(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception:
        user = None
    if user is not None and PasswordResetTokenGenerator().check_token(user, token):
        return render(request, 'reset_password/new_password.html', {'user': user})
    else:
        return render(request, 'reset_password/failed.html')


def reset_password_complete(request):
    if request.method == 'POST':
        uid = request.POST['uid']
        user = User.objects.get(pk=uid)
        password = request.POST['password']
        passwordc = request.POST['passwordc']
        if password != passwordc:
            return render(request, 'reset_password/new_password.html', {'message': 'As senhas devem ser iguais!'})
        user.set_password(password)
        user.save()
        return redirect('/login')


@api_view(['POST'])
def change_password(request):
    password = request.data['password']
    user = authenticate(request, username=request.user.username, password=password)
    new_password = request.data['new_password']
    new_passwordc = request.data['new_passwordc']
    if user is None:
        return Response('Senha incorreta!')
    if new_password != new_passwordc:
        return Response('Os campos "Nova senha" e "Confirmar nova senha" devem ter o mesmo valor!')

    user.set_password(new_password)
    user.save()
    login(request, user)
    return Response('success')


@api_view(['POST'])
def delete_account(request):
    password = request.data['password']
    user = authenticate(request, username=request.user.username, password=password)
    if user is None:
        return Response('Wrong password')
    user.delete()
    return Response('Account deleted')
