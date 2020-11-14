from rest_framework.decorators import api_view
from rest_framework.response import Response

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
from django.shortcuts import render, redirect

from profiles.models import Profile, Interest

def index_view(request):
    if request.user.is_authenticated:
        return redirect('/home')
    else:
        return redirect('/login')

def pages_view(request, slug=None, id=None, query=None):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return redirect('/login')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return render(request, 'pages/login.html', {'message': 'Credenciais inválidas'})
    else:
        return render(request, 'pages/login.html')


def logout_view(request):
    logout(request)
    return redirect('/login')


def signup_view(request):
    if request.method == 'POST':
        first_name = request.POST['first-name']
        last_name = request.POST['last-name']
        username = request.POST['username']
        email = request.POST['email']
        birth_date = request.POST['birth-date']
        password = request.POST['password']
        passwordc = request.POST['passwordc']

        if password != passwordc:
            return render(request, 'pages/signup/signup.html', {'message': 'As senhas devem ser iguais!'})
        if list(User.objects.filter(username=username)) != []:
            return render(request, 'pages/signup/signup.html', {'message': 'Nome de usuário já existe!'})
        if list(Profile.objects.filter(email=email, user__is_active=True)) != []:
            return render(request, 'pages/signup/signup.html', {'message': 'Email já utilizado!'})

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
            return render(request, 'pages/signup/signup.html', {'message': 'Informações inválidas!'})

        return render(request, 'pages/signup/interests.html', {'user': user})
    else:
        return render(request, 'pages/signup/signup.html')

def add_interests_view(request):
    if request.method == 'POST':
        user = User.objects.get(pk=request.POST['uid'])
        profile = Profile.objects.get(user=user)
        interests = request.POST['interests'].split(' ')
        for title in interests:
            if len(title) < 3: continue
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
        return redirect('/')

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
        photo = request.FILES['profile-photo'] if len(request.FILES) else profile.photo
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

@api_view(['POST'])
def change_password(request):
    passwrod = request.data['password']
    user = authenticate(request, username=request.user.username, password=passwrod)

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
    passwrod = request.data['password']
    user = authenticate(request, username=request.user.username, password=passwrod)
    if user is None:
        return Response('Wrong password')
    user.delete()
    return Response('Account deleted')
