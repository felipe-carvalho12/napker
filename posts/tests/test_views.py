import datetime
import mock
import pytz

from django.test import TestCase, Client
from django.contrib.auth.models import User

from posts.models import *
from profiles.serializers import *


class TestViews(TestCase):
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

    
    def test_interest_post_list_view(self):
        pass

    
    def test_explore_post_list_view(self):
        pass


    def test_post_notifications_view(self):
        test_post_2 = Post.objects.create(content='Lorem ipsum dolor sit amet', author=self.test_user.profile)
        like1 = PostLike.objects.create(profile=self.test_user.profile, post=self.test_post)
        comment1 = Comment.objects.create(content='Hello, world!', author=self.test_user.profile, post=self.test_post)

        self.client.force_login(self.test_user)

        response = self.client.get('/post-api/post-notifications')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

        like2 = PostLike.objects.create(profile=self.test_user_2.profile, post=self.test_post)

        response = self.client.get('/post-api/post-notifications')
        notification = Notification.objects.get(post=self.test_post)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, NotificationSerializer([notification], many=True).data)
        self.assertEqual(response.data[0]['likes'], PostLikeSerializer([like2, like1], many=True).data)
        self.assertEqual(response.data[0]['comments'], CommentUnrelatedSerializer([comment1], many=True).data)

        comment2 = Comment.objects.create(content='Hello, world!', author=self.test_user_2.profile, post=self.test_post, layer=1)
        CommentRelationship.objects.create(comment=comment2, parent_comment=comment1)

        response = self.client.get('/post-api/post-notifications')
        notification.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, NotificationSerializer([notification], many=True).data)
        self.assertEqual(response.data[0]['likes'], PostLikeSerializer([like2, like1], many=True).data)
        self.assertEqual(response.data[0]['comments'], CommentUnrelatedSerializer([comment2, comment1], many=True).data)

        like3 = PostLike.objects.create(profile=self.test_user_3.profile, post=test_post_2)

        response = self.client.get('/post-api/post-notifications')
        notification2 = Notification.objects.get(post=test_post_2)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, NotificationSerializer([notification, notification2], many=True).data)
        self.assertEqual(response.data[0]['likes'], PostLikeSerializer([like2, like1], many=True).data)
        self.assertEqual(response.data[0]['comments'], CommentUnrelatedSerializer([comment2, comment1], many=True).data)
        self.assertEqual(response.data[1]['likes'], PostLikeSerializer([like3], many=True).data)
        self.assertEqual(response.data[1]['comments'], [])

        test_post_2.delete()

        like2.visualized = True
        like2.save()
        comment2.visualized = True
        comment2.save()

        response = self.client.get('/post-api/post-notifications')
        notification.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, NotificationSerializer([notification], many=True).data)
        self.assertEqual(response.data[0]['likes'], PostLikeSerializer([like2, like1], many=True).data)
        self.assertEqual(response.data[0]['comments'], CommentUnrelatedSerializer([comment2, comment1], many=True).data)

        like2.visualized = False
        like2.save()
        comment2.visualized = False
        comment2.save()

        # make "now" 3 days ago
        testtime = datetime.datetime.now() - datetime.timedelta(days=3)
        testtime = pytz.utc.localize(testtime)

        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = testtime

            like2.visualized = True
            like2.save()
            comment2.visualized = True
            comment2.save()

        response = self.client.get('/post-api/post-notifications')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    
    def test_visualize_likes_view(self):
        like1 = PostLike.objects.create(profile=self.test_user_2.profile, post=self.test_post)
        like2 = PostLike.objects.create(profile=self.test_user_3.profile, post=self.test_post)

        self.assertFalse(like1.visualized)
        self.assertFalse(like2.visualized)

        self.client.force_login(self.test_user)

        response = self.client.get('/post-api/visualize-likes')
        like1.refresh_from_db()
        like2.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Likes visualized with success')
        self.assertTrue(like1.visualized)
        self.assertTrue(like2.visualized)


    def test_visualize_comments_views(self):
        comment1 = Comment.objects.create(author=self.test_user_2.profile, post=self.test_post, content='Hello, world')
        comment2 = Comment.objects.create(author=self.test_user_3.profile, post=self.test_post, content='Lorem ipsum')
        comment3 = Comment.objects.create(author=self.test_user_3.profile, post=self.test_post, content='Lorem ipsum dolor sit amet', layer=1)
        CommentRelationship.objects.create(comment=comment3, parent_comment=comment2)

        self.assertFalse(comment1.visualized)
        self.assertFalse(comment2.visualized)
        self.assertFalse(comment3.visualized)

        self.client.force_login(self.test_user)

        response = self.client.get('/post-api/visualize-comments')
        comment1.refresh_from_db()
        comment2.refresh_from_db()
        comment3.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Comments visualized with success')
        self.assertTrue(comment1.visualized)
        self.assertTrue(comment2.visualized)
        self.assertTrue(comment3.visualized)
