from django.contrib.auth.models import User
from django.test import TestCase, Client

from .models import Profile


# Create your tests here.
class ProfilesTests(TestCase):
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
    

    def test_get_logged_user_view(self):
        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/logged-user')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.test_user.pk)

    
    def test_get_profile_view(self):
        response = self.client.get(f'/profile-api/user/{self.test_user.profile.slug}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.test_user.profile.pk)

        response = self.client.get(f'/profile-api/user/{self.other_user.profile.slug}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.other_user.profile.pk)

        response = self.client.get(f'/profile-api/user/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bool'], 'false')
    

    def test_get_profile_by_email_view(self):
        response = self.client.get(f'/profile-api/profile-by-email/{self.test_user.profile.email}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.test_user.profile.pk)

        self.test_user.is_active = False
        self.test_user.save()
        response = self.client.get(f'/profile-api/profile-by-email/{self.test_user.profile.email}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bool'], 'false')

        self.test_user.is_active = True
        self.test_user.save()
        response = self.client.get(f'/profile-api/profile-by-email/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bool'], 'false')


    def test_filter_profiles_view(self):
        u1 = User.objects.create(username='daniel')
        u2 = User.objects.create(username='davie')
        u3 = User.objects.create(username='david')

        self.client.force_login(self.test_user)

        response = self.client.get(f'/profile-api/users/da')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

        self.test_user.profile.blocked_users.add(u1)
        response = self.client.get(f'/profile-api/users/da')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual([profile['user']['id'] for profile in response.data], [u2.id, u3.id])

        u2.profile.blocked_users.add(self.test_user)
        response = self.client.get(f'/profile-api/users/da')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], u3.id)

    
    def test_profile_matching_function(self):
        pass
