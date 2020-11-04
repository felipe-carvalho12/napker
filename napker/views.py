from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

from profiles.models import Profile, Interest


def home_view(request, slug=None, id=None):
    if request.user.is_authenticated:
        return render(request, 'pages/index.html')
    else:
        return render(request, 'pages/login.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request, 'pages/index.html')
        else:
            return render(request, 'pages/login.html', {'message': 'Credenciais inválidas'})
    else:
        return render(request, 'pages/login.html')


def logout_view(request):
    logout(request)
    return render(request, 'pages/login.html')


def signup_view(request):
    if request.method == 'POST':
        first_name = request.POST['first-name']
        last_name = request.POST['last-name']
        username = request.POST['username']
        email = request.POST['email']
        gender = request.POST['gender']
        birth_date = request.POST['birth-date']
        password = request.POST['password']
        passwordc = request.POST['passwordc']

        if password != passwordc:
            return render(request, 'pages/signup/signup.html', {'message': 'As senhas devem ser iguais!'})
        if list(User.objects.filter(username=username)) != []:
            return render(request, 'pages/signup/signup.html', {'message': 'Nome de usuário já existe!'})
        if list(Profile.objects.filter(email=email)) != []:
            return render(request, 'pages/signup/signup.html', {'message': 'Email já utilizado!'})

        try:
            user = User.objects.create(username=username, password=password)
            profile = Profile.objects.get(user=user)
            profile.first_name = first_name
            profile.last_name = last_name
            profile.email = email
            profile.gender = gender
            profile.birth_date = birth_date
            profile.save()
            login(request, user)
        except:
            return render(request, 'pages/signup/signup.html', {'message': 'Informações inválidas!'})

        return render(request, 'pages/signup/interests.html')
    else:
        return render(request, 'pages/signup/signup.html')


def add_interests_view(request):
    if request.method == 'POST':
        user = request.user
        profile = Profile.objects.get(user=user)
        interests = request.POST['interests'].split(' ')
        for title in interests:
            i, created = Interest.objects.get_or_create(title=title)
            profile.interests.add(i)
        profile.save()
        return render(request, 'pages/index.html')
    else:
        if request.user.is_authenticated:
            return render(request, 'pages/index.html')
        else:
            return render(request, 'pages/signup/interests.html')


def update_profile(request):
    if request.method == 'POST':
        #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
        profile = Profile.objects.get(user=request.user)
        photo = request.POST['profile-photo'] if request.POST['profile-photo'] != '' else profile.photo
        first_name = request.POST['first-name'] if request.POST['first-name'] != '' else profile.first_name
        last_name = request.POST['last-name'] if request.POST['last-name'] != '' else profile.last_name
        email = request.POST['email'] if request.POST['email'] != '' else profile.email
        gender = request.POST['gender'] if request.POST['gender'] != '' else profile.gender
        birth_date = request.POST['birth-date'] if request.POST['birth-date'] != '' else profile.birth_date
        bio = request.POST['bio'] if request.POST['bio'] != '' else profile.bio
        try:
            profile.photo = photo
            profile.first_name = first_name
            profile.last_name = last_name
            profile.email = email
            profile.gender = gender
            profile.birth_date = birth_date
            profile.bio = bio
            profile.save()
        except:
            pass
        return redirect('/perfil')
