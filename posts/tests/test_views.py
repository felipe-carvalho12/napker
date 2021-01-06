import datetime
import mock

from django.test import TestCase, Client
from django.contrib.auth.models import User

from posts.models import *
from profiles.serializers import *


class PostTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create(username='jorge')
        self.test_user_2 = User.objects.create(username='eduardo')
        self.test_user_3 = User.objects.create(username='luiza')
        self.test_user_4 = User.objects.create(username='joseph')
        self.test_post = Post.objects.create(content='Hello, world!', author=self.test_user.profile)

    
    def test_post_list_view(self):
        pass


    def test_get_post_view(self):
        response = self.client.get('/post-api/post/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, PostSerializer(self.test_post).data)

    
    def test_interest_post_list(self):
        pass

    
    def test_explore_post_list(self):
        pass
