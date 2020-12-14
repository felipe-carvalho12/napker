from django.test import TestCase, Client
import datetime
from django.contrib.auth.models import User

from profiles.models import *
from .models import *

# Create your tests here.

class PostTest(TestCase):
    def setUp(self):
        self.client = Client()

        self.test_user = User.objects.create(username='mark')
        self.test_user.is_active = True
        self.test_user.save()
        self.test_user.profile.birth_date = datetime.date.today()
        self.test_user.profile.save()
        self.post_1 = Post.objects.create(content='Test user 1 first post', author=self.test_user.profile)
        self.post_2 = Post.objects.create(content='Test user 1 second post', author=self.test_user.profile, image='/invalid path')      

        self.test_user_2 = User.objects.create(username='jeff')
        self.test_user_2.is_active = True
        self.test_user_2.save()
        self.test_user_2.profile.birth_date = datetime.date.today()
        self.test_user_2.profile.save()
        self.post_3 = Post.objects.create(content='Test user 2 first post', author=self.test_user_2.profile)
        self.post_4 = Post.objects.create(content='Test user 2 second post', author=self.test_user_2.profile, image='/invalid path')

        self.test_user_3 = User.objects.create(username='larry')
        self.test_user_3.is_active = True
        self.test_user_3.save()
        self.test_user_3.profile.birth_date = datetime.date.today()
        self.test_user_3.profile.save()
        self.post_5 = Post.objects.create(content='Test user 3 first post', author=self.test_user_3.profile)
        self.post_6 = Post.objects.create(content='Test user 3 second post', author=self.test_user_3.profile, image='/invalid path')

        self.test_user_4 = User.objects.create(username='elon')
        self.test_user_4.is_active = True
        self.test_user_4.save()
        self.test_user_4.profile.birth_date = datetime.date.today()
        self.test_user_4.profile.save()
        self.post_7 = Post.objects.create(content='Test user 4 first post', author=self.test_user_4.profile)
        self.post_8 = Post.objects.create(content='Test user 4 second post', author=self.test_user_4.profile, image='/invalid path')

    
    def test_post_list_view(self):
        public_interest_1 = Interest.objects.create(title='napker', public=True)
        private_interest_1 = Interest.objects.create(title='napker', public=False)

        public_interest_2 = Interest.objects.create(title='tecnologia', public=True)
        private_interest_2 = Interest.objects.create(title='tecnologia', public=False)

        public_interest_3 = Interest.objects.create(title='rede social', public=True)
        private_interest_3 = Interest.objects.create(title='rede social', public=False)

        public_interest_4 = Interest.objects.create(title='programação', public=True)
        private_interest_4 = Interest.objects.create(title='programação', public=False)

        public_interest_5 = Interest.objects.create(title='django', public=True)
        private_interest_5 = Interest.objects.create(title='django', public=False)

        public_interest_6 = Interest.objects.create(title='react', public=True)
        private_interest_6 = Interest.objects.create(title='react', public=False)

        public_interest_7 = Interest.objects.create(title='brazil', public=True)
        private_interest_7 = Interest.objects.create(title='brazil', public=False)

        self.test_user.profile.interests.add(public_interest_1)        
        self.test_user.profile.interests.add(public_interest_2)
        self.test_user.profile.interests.add(private_interest_3)
        self.test_user.profile.interests.add(private_interest_7)
        self.test_user.profile.save()

        self.test_user_2.profile.interests.add(private_interest_1)        
        self.test_user_2.profile.interests.add(public_interest_2)
        self.test_user_2.profile.interests.add(public_interest_5)
        self.test_user_2.profile.save()  

        self.test_user_3.profile.interests.add(private_interest_3)        
        self.test_user_3.profile.interests.add(public_interest_4)
        self.test_user_3.profile.interests.add(private_interest_6)
        self.test_user_3.profile.save()

        self.client.force_login(self.test_user)

        response = self.client.get('/post-api/post-list/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 5)
        self.assertEqual(len(self.test_user.profile.post_views.all()), 5)
        self.assertEqual(response.data[0]['author']['user']['username'], self.test_user_2.username)

        response = self.client.get('/post-api/post-list/2')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 8)
        self.assertEqual(len(self.test_user.profile.post_views.all()), 8)
        self.assertEqual(response.data[0]['author']['user']['username'], self.test_user_2.username)

        response = self.client.get('/post-api/post-list/100')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 8)
        self.assertEqual(len(self.test_user.profile.post_views.all()), 8)

        self.test_user_2.profile.birth_date = datetime.date(1980, 6, 1)
        self.test_user_2.profile.save()

        response = self.client.get('/post-api/post-list/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 5)
        self.assertEqual(len(self.test_user.profile.post_views.all()), 8)
        self.assertEqual(response.data[0]['author']['user']['username'], self.test_user_3.username)

        self.test_user_2.profile.birth_date = datetime.date.today()
        self.test_user_2.profile.save()

        self.test_user_4.profile.interests.add(public_interest_7)
        self.test_user_4.profile.interests.add(public_interest_5)
        self.test_user_4.profile.save()

        PostLike.objects.create(profile=self.test_user.profile, post=self.post_3)  

        self.client.force_login(self.test_user_2)
        self.client.get('/post-api/post-list/1')
        PostLike.objects.create(profile=self.test_user_2.profile, post=self.post_3)

        self.client.force_login(self.test_user_3)
        self.client.get('/post-api/post-list/1')
        PostLike.objects.create(profile=self.test_user_3.profile, post=self.post_3)   

        self.client.force_login(self.test_user_4)
        response = self.client.get('/post-api/post-list/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 5)
        self.assertEqual(len(self.test_user_4.profile.post_views.all()), 5)
        self.assertEqual(response.data[0]['author']['user']['username'], self.test_user_2.username)

