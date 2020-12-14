from django.contrib.auth.models import User
from django.test import TestCase, Client

from .views import get_profile_list

from .models import Interest, Profile


# Create your tests here.
class ProfilesTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create(username='fred')
        self.test_user.set_password('secret1')
        self.test_user.is_active = True
        self.test_user.save()
        self.test_user.profile.email = 'fred@fakemail.com'
        self.test_user.profile.save()

        self.test_user_2 = User.objects.create(username='mark')
        self.test_user_2.set_password('secret2')
        self.test_user_2.is_active = True
        self.test_user_2.save()

        self.test_user_3 = User.objects.create(username='jon')
        self.test_user_3.set_password('secret3')
        self.test_user_3.is_active = True
        self.test_user_3.save()
    

    def test_get_logged_user_view(self):
        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/logged-user')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.test_user.pk)

    
    def test_get_profile_view(self):
        response = self.client.get(f'/profile-api/user/{self.test_user.profile.slug}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.test_user.profile.pk)

        response = self.client.get(f'/profile-api/user/{self.test_user_2.profile.slug}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.test_user_2.profile.pk)

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

    
    def test_filter_profiles_by_interest_view(self):
        interest_public_1 = Interest.objects.create(title='napker', public=True)
        interest_private_1 = Interest.objects.create(title='napker', public=False)
        interest_public_2 = Interest.objects.create(title='tecnologia', public=True)

        self.test_user.profile.interests.add(interest_public_1)
        self.test_user.profile.interests.add(interest_private_1)

        self.test_user_2.profile.interests.add(interest_public_1)
        self.test_user_2.profile.interests.add(interest_private_1)
        self.test_user_3.profile.interests.add(interest_private_1)

        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/users-by-interest/napker')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user']['username'], self.test_user_2.username)

        self.test_user_3.profile.interests.add(interest_public_1)
        response = self.client.get('/profile-api/users-by-interest/napker')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        self.test_user_2.profile.interests.add(interest_public_2)
        response = self.client.get('/profile-api/users-by-interest/napker,tecnologia')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user']['username'], self.test_user_2.username)

        response = self.client.get('/profile-api/users-by-interest/napker, tecnologia')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user']['username'], self.test_user_2.username)

        response = self.client.get('/profile-api/users-by-interest/napker, tecnologia, nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

        response = self.client.get('/profile-api/users-by-interest/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)


    def get_profile_list_function(self):
        pass
    

    def test_profile_list_view(self):
        interest_public_1 = Interest.objects.create(title='napker', public=True)
        interest_private_1 = Interest.objects.create(title='napker', public=False)

        self.test_user.profile.interests.add(interest_public_1)
        self.test_user.profile.interests.add(interest_private_1)

        self.test_user_2.profile.interests.add(interest_public_1)
        self.test_user_2.profile.interests.add(interest_private_1)
        self.test_user_3.profile.interests.add(interest_private_1)

        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/interest-profile-list/napker')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user']['username'], self.test_user_2.username)

        response = self.client.get('/profile-api/interest-profile-list/Napker')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user']['username'], self.test_user_2.username)

        response = self.client.get('/profile-api/interest-profile-list/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)