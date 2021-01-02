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


    def test_post_likes_visualized_on_last_2_days(self):
        like1 = PostLike.objects.create(profile=self.test_user_2.profile, post=self.test_post, visualized=True)
        like2 = PostLike.objects.create(profile=self.test_user_3.profile, post=self.test_post, visualized=True)
        PostLike.objects.create(profile=self.test_user.profile, post=self.test_post, visualized=True)

        self.client.force_login(self.test_user)

        response = self.client.get('/post-api/post-likes-visualized-last-2-days')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, PostLikeSerializer([like1, like2], many=True).data)

        like1.visualized = False
        like1.save()

        response = self.client.get('/post-api/post-likes-visualized-last-2-days')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, PostLikeSerializer([like2], many=True).data)

        '''# make "now" 3 days ago | add mock==4.0.3 to requirements.txt
        testtime = datetime.date.today() - datetime.timedelta(days=3)

        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = testtime

            PostLike.objects.create(profile=self.test_user_4.profile, post=self.test_post, visualized=True)

        response = self.client.get('/post-api/post-likes-visualized-last-2-days')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, PostLikeSerializer([like2], many=True).data)'''