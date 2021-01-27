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
        response = self.client.get(f'/profile-api/user/{self.test_user_2.profile.user.username}')
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
        User.objects.create(username='davy', is_active=False)
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
        self.assertEqual(response.status_code, 200)
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


    def test_set_weights_view(self):
        profile_w = ProfileWeights.objects.create(interest_weight=85, age_weight=5, friends_weight=52, is_friend_weight=10)
        post_w = PostWeights.objects.create(date_weight=99, author_weight=51, likes_weight=8)
        weights = Weights.objects.create(profile=profile_w, post=post_w)

        post_data = {
           'profile': {
                'interest_weight': 85,
                'age_weight': 5,
                'friends_weight': 52,
                'is_friend_weight': 10
            },
            'post': {
                'date_weight': 99,
                'author_weight': 51,
                'likes_weight': 8,
            }
        }

        self.client.force_login(self.test_user)
        response = self.client.post('/profile-api/set-weights', post_data, content_type='application/json')
        self.test_user.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'weights updated')
        self.assertEqual(self.test_user.profile.weights, weights)

    
    def test_friends_profiles_view(self):
        self.test_user.profile.friends.add(self.test_user_2)
        self.test_user.profile.friends.add(self.test_user_3)
        self.test_user.profile.save()

        response = self.client.get(f'/profile-api/get-friends-profiles/{self.test_user}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile, self.test_user_3.profile], many=True).data)

    
    def test_blocked_profiles_view(self):
        self.test_user.profile.blocked_users.add(self.test_user_2)
        self.test_user.profile.blocked_users.add(self.test_user_3)
        self.test_user.profile.save()

        self.client.force_login(self.test_user)

        response = self.client.get(f'/profile-api/get-blocked-profiles')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ProfileSerializer([self.test_user_2.profile, self.test_user_3.profile], many=True).data)

        self.test_user.profile.blocked_users.clear()
        self.test_user.profile.save()

        response = self.client.get(f'/profile-api/get-blocked-profiles')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])


    def test_get_relationship_view(self):
        Relationship.objects.create(sender=self.test_user.profile, receiver=self.test_user_2.profile, status='accepted')

        self.client.force_login(self.test_user)

        response = self.client.get(f'/profile-api/relationship/{self.test_user_2.username}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'relationship': 'friends'})

        Relationship.objects.create(sender=self.test_user.profile, receiver=self.test_user_3.profile, status='sent')

        response = self.client.get(f'/profile-api/relationship/{self.test_user_3.username}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'relationship': 'invite-sent'})

        relationship = Relationship.objects.create(sender=self.test_user_4.profile, receiver=self.test_user.profile, status='sent')

        response = self.client.get(f'/profile-api/relationship/{self.test_user_4.username}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'relationship': 'invite-received'})

        relationship.delete()

        response = self.client.get(f'/profile-api/relationship/{self.test_user_4.username}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'relationship': 'none'})


    def test_friend_requests_received_view(self):
        rel1 = Relationship.objects.create(sender=self.test_user_2.profile, receiver=self.test_user.profile, status='sent')
        rel2 = Relationship.objects.create(sender=self.test_user_3.profile, receiver=self.test_user.profile, status='sent')

        self.client.force_login(self.test_user)

        response = self.client.get(f'/profile-api/myinvites')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, RelationshipSerializer([rel1, rel2], many=True).data)

        rel1.delete()
        rel2.delete()

        response = self.client.get(f'/profile-api/myinvites')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    
    def test_remove_from_friends_view(self):
        Relationship.objects.create(sender=self.test_user_2.profile, receiver=self.test_user.profile, status='accepted')
        Relationship.objects.create(sender=self.test_user.profile, receiver=self.test_user_3.profile, status='accepted')

        self.client.force_login(self.test_user)

        response = self.client.post(f'/profile-api/remove-from-friends', self.test_user_2.profile.id, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Removed from friends with success')
        self.assertEqual(list(self.test_user.profile.friends.all()), [self.test_user_3])

        response = self.client.post(f'/profile-api/remove-from-friends', self.test_user_3.profile.id, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Removed from friends with success')
        self.assertEqual(list(self.test_user.profile.friends.all()), [])


    def test_send_friend_request_view(self):
        self.client.force_login(self.test_user)

        response = self.client.post(f'/profile-api/send-friend-request', self.test_user_2.profile.id, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Friend request sent')
        self.assertTrue(Relationship.objects.filter(sender=self.test_user.profile, receiver=self.test_user_2.profile, status='sent').exists())

        response = self.client.post(f'/profile-api/send-friend-request', self.test_user_2.profile.id, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Users already have a relationship')

        Relationship.objects.create(sender=self.test_user.profile, receiver=self.test_user_3.profile, status='accepted')

        response = self.client.post(f'/profile-api/send-friend-request', self.test_user_3.profile.id, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Users already have a relationship')

        Relationship.objects.create(sender=self.test_user_4.profile, receiver=self.test_user.profile, status='sent')

        response = self.client.post(f'/profile-api/send-friend-request', self.test_user_4.profile.id, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Users already have a relationship')

    
    def test_cancel_friend_request_view(self):
        Relationship.objects.create(sender=self.test_user.profile, receiver=self.test_user_2.profile, status='sent')

        self.client.force_login(self.test_user)
        response = self.client.post(f'/profile-api/cancel-friend-request', self.test_user_2.profile.id, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Friend request canceled')
        self.assertFalse(Relationship.objects.filter(sender=self.test_user.profile, receiver=self.test_user_2.profile, status='sent').exists())


    def test_reply_friend_request_view(self):
        rel1 = Relationship.objects.create(sender=self.test_user_2.profile, receiver=self.test_user.profile, status='sent')
        Relationship.objects.create(sender=self.test_user_3.profile, receiver=self.test_user.profile, status='sent')
        
        self.client.force_login(self.test_user)

        response = self.client.post(f'/profile-api/reply-friend-request', {'senderid': self.test_user_2.profile.id, 'reply': 'accept'}, content_type='application/json')
        rel1.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Replied with success')
        self.assertEqual(rel1.status, 'accepted')

        response = self.client.post(f'/profile-api/reply-friend-request', {'senderid': self.test_user_3.profile.id, 'reply': 'decline'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Replied with success')
        self.assertFalse(Relationship.objects.filter(sender=self.test_user_2.profile, receiver=self.test_user.profile, status='sent').exists())


    def test_block_profile_view(self):
        Relationship.objects.create(sender=self.test_user.profile, receiver=self.test_user_2.profile, status='sent')

        self.client.force_login(self.test_user)

        response = self.client.post(f'/profile-api/block-user', {'id': self.test_user_2.profile.id}, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Profile blocked')
        self.assertFalse(Relationship.objects.filter(sender=self.test_user.profile, receiver=self.test_user_2.profile, status='sent').exists())
        self.assertIn(self.test_user_2, self.test_user.profile.blocked_users.all())

        Relationship.objects.create(sender=self.test_user_3.profile, receiver=self.test_user.profile, status='sent')

        response = self.client.post(f'/profile-api/block-user', {'id': self.test_user_3.profile.id}, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Profile blocked')
        self.assertFalse(Relationship.objects.filter(sender=self.test_user_3.profile, receiver=self.test_user.profile, status='sent').exists())
        self.assertIn(self.test_user_3, self.test_user.profile.blocked_users.all())

        Relationship.objects.create(sender=self.test_user.profile, receiver=self.test_user_4.profile, status='accepted')

        response = self.client.post(f'/profile-api/block-user', {'id': self.test_user_4.profile.id}, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Profile blocked')
        self.assertFalse(Relationship.objects.filter(sender=self.test_user.profile, receiver=self.test_user_4.profile, status='accepted').exists())
        self.assertIn(self.test_user_3, self.test_user.profile.blocked_users.all())

        response = self.client.post(f'/profile-api/block-user', {'id': self.test_user.profile.id}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'You can\'t block yourself')


    def test_unblock_profile_view(self):
        self.test_user.profile.blocked_users.add(self.test_user_2)
        self.test_user.profile.save()

        self.assertIn(self.test_user_2, self.test_user.profile.blocked_users.all())

        self.client.force_login(self.test_user)
        response = self.client.post(f'/profile-api/unblock-user', {'id': self.test_user_2.profile.id}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertNotIn(self.test_user_2, self.test_user.profile.blocked_users.all())
        self.assertEqual(response.data, 'Profile unblocked')


    def test_set_myinterests_view(self):
        int1 = Interest.objects.create(title='tech', public=True)
        int2 = Interest.objects.create(title='ai', public=False)
        self.test_user.profile.interests.add(int1)
        self.test_user.profile.interests.add(int2)
        self.test_user.profile.save()

        post_data = {
            'public_interests': ['napker', 'rede social', 'Programação'],
            'private_interests': ['Django', 'react']
        }

        self.client.force_login(self.test_user)

        response = self.client.post(f'/profile-api/set-myinterests', post_data, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual([i.title for i in self.test_user.profile.interests.filter(public=True)], ['napker', 'programação', 'rede social'])
        self.assertEqual([i.title for i in self.test_user.profile.interests.filter(public=False)], ['django', 'react'])

        self.test_user.profile.interests.clear()
        self.test_user.profile.save()

        post_data = {
             'public_interests': ['ab', 'napker', 'rede social', 'Programação'],
             'private_interests': ['ab', 'Django', 'react']
        }

        response = self.client.post('/profile-api/set-myinterests', post_data, content_type='application/json')
        self.test_user.profile.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual([i.title for i in self.test_user.profile.interests.filter(public=True)], ['napker', 'programação', 'rede social'])
        self.assertEqual([i.title for i in self.test_user.profile.interests.filter(public=False)], ['django', 'react'])
