import datetime

from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from posts.models import Post
from profiles.models import Interest


class TestViews(TestCase):
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
        response = self.client.post('/post-login', {'username': self.test_user.username, 'password': 'wrong'})
        self.assertEqual(response.status_code, 200)
        self.assertRaises(KeyError, lambda: self.client.session['_auth_user_id'])
        self.assertEqual(response.data, 'Credenciais inválidas. Por favor verifique seus dados e tente novamente.')

        response = self.client.post('/post-login', {'username': self.test_user.username , 'password': 'secret'})
        self.test_user.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(self.client.session['_auth_user_id']), self.test_user.id)
        self.assertEqual(response.data, 'logged in')


    def test_logout(self):
        self.client.force_login(user=self.test_user)
        response = self.client.get('/logout', follow=True)
        self.assertEqual(response.redirect_chain[-1], ('/login', 302))


    def test_signup(self):  
        post_data = {
            'first-name': 'John',
            'last-name': 'Smith',
            'username': 'john_smith123',
            'email': 'john@fakemail.com',
            'birth-date': '2000-7-14',
            'password': 'secret',
            'passwordc': 'secret'
        }
        response = self.client.post('/post-signup', { **post_data, 'passwordc': 'different_than_password' })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'As senhas devem ser iguais.')

        response = self.client.post('/post-signup', { **post_data, 'username': self.test_user.username })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Nome de usuário indisponível.')

        response = self.client.post('/post-signup', { **post_data, 'email': self.test_user.profile.email })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Email já utilizado.')

        response = self.client.post('/post-signup', post_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], 'account created')
        self.assertEqual(response.data['userId'], User.objects.last().id)

        user = User.objects.get(username='john_smith123')
        self.assertEqual(user.profile.first_name, 'John')
        self.assertEqual(user.profile.last_name, 'Smith')
        self.assertEqual(user.username, 'john_smith123')
        self.assertEqual(user.profile.email, 'john@fakemail.com')
        self.assertEqual(user.profile.birth_date, datetime.date(2000, 7, 14))

        post_data = {
            'uid': user.id,
            'public_interests': ['napker', 'rede social', 'Programação'],
            'private_interests': ['Django', 'react']
        }

        response = self.client.post('/post-signup/interests', post_data, content_type='application/json')
        user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertFalse(user.is_active)
        self.assertEqual([i.title for i in user.profile.interests.filter(public=True)], ['napker', 'programação', 'rede social'])
        self.assertEqual([i.title for i in user.profile.interests.filter(public=False)], ['django', 'react'])
        self.assertEqual(response.data, 'activation link sent')

        user.profile.interests.clear()
        user.profile.save()

        post_data = {
            'uid': user.id,
            'public_interests': ['ab', 'napker', 'rede social', 'Programação'],
            'private_interests': ['ab', 'Django', 'react']
        }

        response = self.client.post('/post-signup/interests', post_data, content_type='application/json')
        user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertFalse(user.is_active)
        self.assertEqual([i.title for i in user.profile.interests.filter(public=True)], ['napker', 'programação', 'rede social'])
        self.assertEqual([i.title for i in user.profile.interests.filter(public=False)], ['django', 'react'])

        uidb64 = urlsafe_base64_encode(force_bytes(user.id))
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
            'profile-photo': 'data:image/png;base64,iVBORw0KGg====',
            'first-name': 'Fred',
            'last-name': 'Santos',
            'username': 'fred.santos',
            'birth-date': '2000-8-14',
            'bio': 'Hello, world!'
        }

        self.client.force_login(user=self.test_user)

        response = self.client.post('/update-profile', post_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'profile updated')

        response = self.client.post('/update-profile', {**post_data, 'profile-photo': ''})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'profile updated')

        response = self.client.post('/update-profile', {**post_data, 'username': self.other_user.username})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Nome de usuário indisponível')

        response = self.client.post('/update-profile', {**post_data, 'first-name': 'a' * 51})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Servidor custa caro! (:')

        response = self.client.post('/update-profile', {**post_data, 'last-name': 'a' * 51})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Servidor custa caro! (:')

        response = self.client.post('/update-profile', {**post_data, 'username': 'a' * 51})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Servidor custa caro! (:')

        response = self.client.post('/update-profile', {**post_data, 'bio': 'a' * 241})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Servidor custa caro! (:')

        self.test_user.refresh_from_db()
        self.assertEqual(self.test_user.profile.first_name, 'Fred')
        self.assertEqual(self.test_user.profile.last_name, 'Santos')
        self.assertEqual(self.test_user.username, 'fred.santos')
        self.assertEqual(self.test_user.profile.birth_date, datetime.date(2000, 8, 14))
        self.assertEqual(self.test_user.profile.bio, 'Hello, world!')


    def test_reset_password(self):
        response = self.client.post('/post-reset-password', {'email': 'unexistent_email'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Não existe nenhuma conta ligada a esse email!')

        response = self.client.post('/post-reset-password', {'email': self.test_user.profile.email})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'email sent')

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

        response = self.client.post('/reset-password-complete', {'uid': self.test_user.id, 'password': 'test', 'passwordc': 'different'})
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reset_password/new_password.html')
        self.assertEqual(response.context['message'], 'As senhas devem ser iguais!')
        self.assertContains(response, 'Recuperar senha / Napker')

        response = self.client.post('/reset-password-complete', {'uid': self.test_user.id, 'password': 'test', 'passwordc': 'test'}, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.redirect_chain[-1], ('/login', 302))
        self.assertTrue(self.client.login(username=self.test_user.username, password='test'))

    
    def test_change_password(self):
        user = User.objects.create(username='felipe')
        user.set_password('password098')
        user.save()
        request_data = {
            'password': 'password098',
            'new_password': 'test',
            'new_passwordc': 'test'
        }
        self.client.force_login(user)

        response = self.client.post('/change-password', {**request_data, 'password': 'wrong'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Senha incorreta!')

        response = self.client.post('/change-password', {**request_data, 'password': 'password098', 'new_password': 'different'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Os campos "Nova senha" e "Confirmar nova senha" devem ter o mesmo valor!')

        response = self.client.post('/change-password', request_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'success')

        self.assertTrue(user.is_authenticated)


    def test_delete_account(self):
        user = User.objects.create(username='felipe')
        user.set_password('password098')
        user.save()
        self.client.force_login(user)

        response = self.client.post('/delete-account', {'password': 'wrong'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Wrong password')
        self.assertTrue(User.objects.filter(username='felipe').exists())

        response = self.client.post('/delete-account', {'password': 'password098'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Account deleted')
        self.assertFalse(User.objects.filter(username='felipe').exists())

