from django.contrib.auth.models import User
from django.test import TestCase, Client

from profiles.models import *
from profiles.serializers import *


# Create your tests here.
class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create(username='mark')
        self.test_user.set_password('secret1')
        self.test_user.is_active = True
        self.test_user.save()
        self.test_user.profile.email = 'mark@fakemail.com'
        self.test_user.profile.save()

        self.test_user_2 = User.objects.create(username='daniel')
        self.test_user_2.set_password('secret3')
        self.test_user_2.is_active = True
        self.test_user_2.save()

        self.test_user_3 = User.objects.create(username='pedro')
        self.test_user_3.set_password('secret2')
        self.test_user_3.is_active = True
        self.test_user_3.save()

        self.test_user_4 = User.objects.create(username='david')
        self.test_user_4.set_password('secret3')
        self.test_user_4.is_active = True
        self.test_user_4.save()
    

    def test_is_logged_view(self):
        response = self.client.get('/profile-api/is-logged')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'False')

        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/is-logged')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'True')


    def test_get_logged_user_view(self):
        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/logged-user')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, UserSerializer(self.test_user).data)

    
    def test_get_profile_view(self):
        response = self.client.get(f'/profile-api/user/{self.test_user_2.profile.slug}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer(self.test_user_2.profile).data)

        response = self.client.get(f'/profile-api/user/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bool'], 'false')
    

    def test_get_profile_by_email_view(self):
        response = self.client.get(f'/profile-api/profile-by-email/{self.test_user.profile.email}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer(self.test_user.profile).data)

        response = self.client.get(f'/profile-api/profile-by-email/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bool'], 'false')

        self.test_user.is_active = False
        self.test_user.save()

        response = self.client.get(f'/profile-api/profile-by-email/{self.test_user.profile.email}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bool'], 'false')


    def test_filter_profiles_view(self):
        self.client.force_login(self.test_user)

        response = self.client.get(f'/profile-api/users/d')
        self.assertEqual(response.status_code, 200)
        self.assertEqual([p['slug'] for p in response.data], ['daniel', 'david', 'pedro'])

        response = self.client.get(f'/profile-api/users/da')
        self.assertEqual(response.status_code, 200)
        self.assertEqual([p['slug'] for p in response.data], ['daniel', 'david'])

        response = self.client.get(f'/profile-api/users/mark')
        self.assertEqual(response.status_code, 200)
        self.assertEqual([p['slug'] for p in response.data], ['mark'])

    
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
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile], many=True).data)

        self.test_user_3.profile.interests.add(interest_public_1)

        response = self.client.get('/profile-api/users-by-interest/napker')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile, self.test_user_3.profile], many=True).data)

        self.test_user_2.profile.interests.add(interest_public_2)

        response = self.client.get('/profile-api/users-by-interest/napker,tecnologia')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile], many=True).data)

        response = self.client.get('/profile-api/users-by-interest/napker, tecnologia')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile], many=True).data)

        response = self.client.get('/profile-api/users-by-interest/napker, tecnologia, nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

        response = self.client.get('/profile-api/users-by-interest/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])


    def test_myprofile_list_view(self):
        pass
    

    def test_profile_list_view(self):
        pass

    
    def test_interest_profile_list_view(self):
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
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile], many=True).data)

        response = self.client.get('/profile-api/interest-profile-list/Napker')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile], many=True).data)

        response = self.client.get('/profile-api/interest-profile-list/nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])


    def test_my_profile_view(self):
        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/myprofile')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer(self.test_user.profile).data)

    
    def test_get_weights_views(self):
        profile_w = ProfileWeights.objects.create(interest_weight=30, age_weight=55, friends_weight=10, is_friend_weight=100)
        post_w = PostWeights.objects.create(date_weight=78, author_weight=40, likes_weight=95)
        weights = Weights.objects.create(profile=profile_w, post=post_w)

        self.test_user.profile.weights = weights
        self.test_user.profile.save()

        self.client.force_login(self.test_user)
        response = self.client.get('/profile-api/get-weights')
        self.assertEqual(response.data, WeightsSerializer(weights).data)

        self.client.force_login(self.test_user_2)
        response = self.client.get('/profile-api/get-weights')
        self.assertEqual(response.data, {
            'profile': {
                'interest_weight': 50,
                'age_weight': 50,
                'friends_weight': 50,
                'is_friend_weight': 50
            },
            'post': {
                'date_weight': 50,
                'author_weight': 50,
                'likes_weight': 50,
            }
        })
