import datetime
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from posts.models import Post
from profiles.models import Interest


class RouteTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create(username='fred')
        self.test_user.set_password('secret')
        self.test_user.is_active = True
        self.test_user.save()
        self.test_user.profile.email = 'fred@fakemail.com'
        self.test_user.profile.save()

        self.other_user = User.objects.create(username='mark')
        self.other_user.set_password('secret')
        self.other_user.is_active = True
        self.other_user.save()
        Post.objects.create(content='Hello, world!', author=self.other_user.profile)

    def test_login(self):   
        response = self.client.get('/login')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/login.html')
        self.assertContains(response, 'Entrar / Napker')

        response = self.client.post('/login', {'username': 'fred', 'password': 'secret'}, follow=True)
        self.assertEqual(response.redirect_chain[-1], ('/home', 302))

        response = self.client.post('/login', {'username': 'fred', 'password': 'wrong'})
        self.assertTemplateUsed(response, 'pages/login.html') 
        self.assertEqual(response.context['message'], 'Credenciais inválidas')

    def test_logout(self):
        self.client.force_login(user=self.test_user)
        response = self.client.get('/logout', follow=True)
        self.assertEqual(response.redirect_chain[-1], ('/login', 302))

    def test_signup(self):  
        response = self.client.get('/signup')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/signup/signup.html')
        self.assertContains(response, 'Criar conta / Napker')

        post_data = {
            'first-name': 'John',
            'last-name': 'Smith',
            'username': 'john_smith123',
            'email': 'john@fakemail.com',
            'birth-date': '2000-7-14',
            'password': 'secret',
            'passwordc': 'secret'
        }
        response = self.client.post('/signup', { **post_data, 'passwordc': 'different_than_password' })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/signup/signup.html')
        self.assertEqual(response.context['message'], 'As senhas devem ser iguais!')

        response = self.client.post('/signup', { **post_data, 'username': self.test_user.username })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/signup/signup.html')
        self.assertEqual(response.context['message'], 'Nome de usuário já existe!')

        response = self.client.post('/signup', { **post_data, 'email': self.test_user.profile.email })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/signup/signup.html')
        self.assertEqual(response.context['message'], 'Email já utilizado!')

        response = self.client.post('/signup', post_data)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/signup/interests.html')
        self.assertContains(response, 'Quais os seus principais interesses?')

        user = User.objects.get(username='john_smith123')
        self.assertEqual(user.profile.first_name, 'John')
        self.assertEqual(user.profile.last_name, 'Smith')
        self.assertEqual(user.username, 'john_smith123')
        self.assertEqual(user.profile.email, 'john@fakemail.com')
        self.assertEqual(user.profile.birth_date, datetime.date(2000, 7, 14))
        self.assertEqual(user.password, 'secret')

        response = self.client.post('/signup/interesses', {'uid': user.pk, 'interests': 'futebol, viajar'})
        self.assertFalse(user.is_active)
        self.assertEqual([(i.title, i.public) for i in user.profile.interests.all()], [('futebol', False), ('viajar', False)])

        response = self.client.post('/signup/interesses', {'uid': user.pk, 'interests': 'ab, futebol, viajar'})
        self.assertEqual([(i.title, i.public) for i in user.profile.interests.all()], [('futebol', False), ('viajar', False)])

        response = self.client.get('/', follow=True)
        self.assertEqual(response.redirect_chain[-1], ('/login', 302))

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)
        response = self.client.get(f'/activate/{uidb64}/{token}', follow=True)
        self.assertEqual(response.redirect_chain[-1], ('/home', 302))

        response = self.client.get(f'/activate/{uidb64}/invalid_token')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'auth/activation_failed.html')

        response = self.client.get(f'/activate/invalid_uidb64/{token}')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'auth/activation_failed.html')
    
    # REACT APP ROUTES

    def test_home_route(self):
        self.client.force_login(user=self.test_user)
        response = self.client.get('/home')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_notifications_route(self):
        self.client.force_login(user=self.test_user)
        response = self.client.get('/notificações')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
    
    def test_messages_route(self):
        self.client.force_login(user=self.test_user)

        response = self.client.get('/mensagens')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/mensagens/fred')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
    
    def test_profile_route(self):
        self.client.force_login(user=self.test_user)

        response = self.client.get('/perfil')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/perfil/meus-interesses')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_settings_route(self):
        self.client.force_login(user=self.test_user)

        response = self.client.get('/configurações')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/configurações/perfis-bloqueados')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/configurações/alterar-senha')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/configurações/deletar-conta')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
    
    def test_user_route(self):
        self.client.force_login(user=self.test_user)

        response = self.client.get('/user/mark')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/user/mark/amigos')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
    
    def test_post_route(self):
        self.client.force_login(user=self.test_user)

        response = self.client.get('/post/1')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/post/1/comentar')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        response = self.client.get('/postar')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
    
    def test_interests_route(self):
        self.client.force_login(user=self.test_user)

        response = self.client.get('/interesses/napker')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
    
        