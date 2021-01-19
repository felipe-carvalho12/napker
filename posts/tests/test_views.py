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


    def test_create_post_view(self):
        pass


    def test_delete_post_view(self):
        pk = self.test_post.id

        self.client.force_login(self.test_user_2)
        response = self.client.delete(f'/post-api/delete-post/{self.test_post.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f"Post #{self.test_post.id} doesn't belongs to you")
        self.assertTrue(Post.objects.filter(id=pk).exists())

        self.client.force_login(self.test_user)
        response = self.client.delete(f'/post-api/delete-post/{self.test_post.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f'Deleted post #{self.test_post.id}')
        self.assertFalse(Post.objects.filter(id=pk).exists())

    
    def test_create_comment_view(self):
        pass


    def test_delete_comment_view(self):
        pk1 = Comment.objects.create(author=self.test_user.profile, post=self.test_post, content='Hello, world!').id
        pk2 = Comment.objects.create(author=self.test_user_2.profile, post=self.test_post, content='Lorem ipsum', layer=1).id
        pk3 = Comment.objects.create(author=self.test_user_2.profile, post=self.test_post, content='Lorem ipsum dolor sit amet', layer=2).id
        CommentRelationship.objects.create(comment=Comment.objects.get(id=pk2), parent_comment=Comment.objects.get(id=pk1))
        CommentRelationship.objects.create(comment=Comment.objects.get(id=pk3), parent_comment=Comment.objects.get(id=pk2))

        self.client.force_login(self.test_user_2)
        response = self.client.delete(f'/post-api/delete-comment/{pk1}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f"Comment #{pk1} doesn't belongs to you")
        self.assertTrue(Comment.objects.filter(id=pk1).exists())
        self.assertTrue(Comment.objects.filter(id=pk2).exists())
        self.assertTrue(Comment.objects.filter(id=pk3).exists())

        self.client.force_login(self.test_user)
        response = self.client.delete(f'/post-api/delete-comment/{pk1}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f'Deleted comment #{pk1}')
        self.assertFalse(Comment.objects.filter(id=pk1).exists())
        self.assertFalse(Comment.objects.filter(id=pk2).exists())
        self.assertFalse(Comment.objects.filter(id=pk3).exists())


    def test_like_post_view(self):
        self.assertEqual(len(self.test_post.likes.all()), 0)

        self.client.force_login(self.test_user)

        response = self.client.get(f'/post-api/like-post/{self.test_post.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f"Liked post #{self.test_post.id}")
        self.assertEqual(len(self.test_post.likes.all()), 1)

        response = self.client.get(f'/post-api/like-post/{self.test_post.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f"You have already liked post #{self.test_post.id}")
        self.assertEqual(len(self.test_post.likes.all()), 1)

        self.client.force_login(self.test_user_2)

        response = self.client.get(f'/post-api/like-post/{self.test_post.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f"Liked post #{self.test_post.id}")
        self.assertEqual(len(self.test_post.likes.all()), 2)

        response = self.client.get(f'/post-api/like-post/{self.test_post.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, f"You have already liked post #{self.test_post.id}")
        self.assertEqual(len(self.test_post.likes.all()), 2)


    def test_unlike_post_view(self):
        pass

    
    def test_like_comment_view(self):
        pass


    def test_unlike_comment_view(self):
        pass


    def test_get_mentions_view(self):
        User.objects.create(username='guido', is_active=False)

        self.client.force_login(self.test_user)
        response = self.client.get('/post-api/get-mentions')
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.data == ProfileMentionSerializer(Profile.objects.exclude(user=self.test_user), many=True).data)
        self.assertTrue(response.data == ProfileMentionSerializer(Profile.objects.filter(user__is_active=True).exclude(user=self.test_user), many=True).data)
