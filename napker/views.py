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

from profiles.models import Profile, Interest

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


def add_interests_view(request):
    if request.method == 'POST':
        user = User.objects.get(pk=request.POST['uid'])
        profile = Profile.objects.get(user=user)
        interests = request.POST['interests'].split(', ')
        for title in interests:
            if len(title) < 3:
                continue
            i, created = Interest.objects.get_or_create(title=title, public=False)
            profile.interests.add(i)
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

        return render(request, 'pages/signup/activation_link_sent.html')
    else:
        return render(request, 'index.html')


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
        return redirect('/')
    else:
        return render(request, 'auth/activation_failed.html')


def update_profile(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)

        if request.POST.get('profile-photo', False):
            format, imgstr = request.POST['profile-photo'].split(';base64,') 
            img_format = format.split('/')[-1] 
            photo = ContentFile(base64.b64decode(imgstr), name=profile.user.username + img_format)
        else:
            photo = profile.photo

        first_name = request.POST['first-name'] if request.POST['first-name'] != '' else profile.first_name
        last_name = request.POST['last-name'] if request.POST['last-name'] != '' else profile.last_name
        username = request.POST['username'] if request.POST['username'] != '' else profile.user.username
        birth_date = request.POST['birth-date'] if request.POST['birth-date'] != '' else profile.birth_date
        bio = request.POST['bio'] if request.POST['bio'] != '' else profile.bio
        try:
            profile.photo = photo
            profile.first_name = first_name
            profile.last_name = last_name
            profile.user.username = username if not User.objects.filter(username=username).exists() else profile.user.username
            profile.birth_date = birth_date
            profile.bio = bio
            profile.user.save()
            profile.save()
        except:
            pass
        return redirect('/perfil')


def reset_password(request):
    if request.method == 'POST':
        email = request.POST['email']
        if not Profile.objects.filter(email=email).exists():
            return render(request, 'reset_password/reset_password.html', {'message': 'Não existe nenhuma conta ligada a esse email!'})
        profile = Profile.objects.get(email=email)
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
        return render(request, 'reset_password/email_sent.html')
    else:
        return render(request, 'reset_password/reset_password.html')


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
        return render(request, 'pages/login.html', {'success_message': 'Senha alterada com sucesso!'})


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
