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
        self.assertEqual(response.status_code, 200)
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


    def test_update_profile(self):
        post_data = {
            'photo': 'test.png',
            'first-name': 'Fred',
            'last-name': 'Santos',
            'username': 'fred.santos',
            'birth-date': '2000-8-14',
            'bio': 'Hello, world!'
        }
        self.client.force_login(user=self.test_user)
        response = self.client.post('/update-profile', post_data, follow=True)
        self.assertEqual(response.redirect_chain[-1], ('/perfil', 302))
    

    def test_reset_password(self):
        response = self.client.get('/recuperar-senha')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/reset_password.html')
        self.assertContains(response, 'Recuperar senha / Napker')

        response = self.client.post('/recuperar-senha', {'email': 'unexistent_email'})
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/reset_password.html')
        self.assertEqual(response.context['message'], 'Não existe nenhuma conta ligada a esse email!')
        self.assertContains(response, 'Recuperar senha / Napker')

        response = self.client.post('/recuperar-senha', {'email': self.test_user.profile.email})
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/email_sent.html')
        self.assertContains(response, 'Recuperar senha / Napker')

        uidb64 = urlsafe_base64_encode(force_bytes(self.test_user.pk))
        token = PasswordResetTokenGenerator().make_token(self.test_user)
        response = self.client.get(f'/reset/{uidb64}/{token}')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/new_password.html')
        self.assertEqual(response.context['user'], self.test_user)
        self.assertContains(response, 'Recuperar senha / Napker')

        response = self.client.get(f'/reset/{uidb64}/invalid_token')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/failed.html')

        response = self.client.get(f'/reset/invalid_uidb64/{token}')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/failed.html')

        response = self.client.post('/reset-password-complete', {'uid': self.test_user.pk, 'password': 'test', 'passwordc': 'different'})
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/new_password.html')
        self.assertEqual(response.context['message'], 'As senhas devem ser iguais!')
        self.assertContains(response, 'Recuperar senha / Napker')

        response = self.client.post('/reset-password-complete', {'uid': self.test_user.pk, 'password': 'test', 'passwordc': 'test'})
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/login.html')
        self.assertEqual(response.context['success_message'], 'Senha alterada com sucesso!')
        self.assertContains(response, 'Entrar / Napker')

    
    def test_change_password(self):
        user = User.objects.create(username='felipe')
        user.set_password('password098')
        user.save()
        request_body = {
            'password': 'password098',
            'new_password': 'test',
            'new_passwordc': 'test'
        }
        self.client.force_login(user)

        response = self.client.post('/change-password', {**request_body, 'password': 'wrong'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Senha incorreta!')

        response = self.client.post('/change-password', request_body, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'success')

        response = self.client.post('/change-password', {**request_body, 'password': 'test', 'new_password': 'different'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Os campos "Nova senha" e "Confirmar nova senha" devem ter o mesmo valor!')


    def test_delete_account(self):
        user = User.objects.create(username='felipe')
        user.set_password('password098')
        user.save()
        users_count = User.objects.all().count()
        self.client.force_login(user)

        response = self.client.post('/delete-account', {'password': 'wrong'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Wrong password')
        self.assertEqual(users_count, User.objects.all().count())

        response = self.client.post('/delete-account', {'password': 'password098'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Account deleted')
        self.assertEqual(users_count - 1, User.objects.all().count())


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
