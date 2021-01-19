from django.test import TestCase
from django.urls import resolve, reverse

from posts.views import *

class TestUrls(TestCase):
    def test_post_list_url(self):
        self.assertEqual(resolve('/post-api/post-list/1').func, post_list_view)

    def test_post_url(self):
        self.assertEqual(resolve('/post-api/post/1').func, get_post)

    def test_interest_post_list_url(self):
        self.assertEqual(resolve('/post-api/interest-post-list/<str:interest>').func, interest_post_list)

    def test_explore_post_list_url(self):
        self.assertEqual(resolve('/post-api/explore-post-list').func, explore_post_list)

    def  test_post_notifications_url(self):
        self.assertEqual(resolve('/post-api/post-notifications').func, post_notifications)

    def test_visualize_likes_url(self):
        self.assertEqual(resolve('/post-api/visualize-likes').func, visualize_likes)

    def test_visualize_comments_url(self): 
        self.assertEqual(resolve('/post-api/visualize-comments').func, visualize_comments)

    def test_create_post_url(self): 
        self.assertEqual(resolve('/post-api/create-post').func, create_post)

    def test_delete_post_url(self):
        self.assertEqual(resolve('/post-api/delete-post/1').func, delete_post)

    def test_create_comment_url(self): 
        self.assertEqual(resolve('/post-api/create-comment').func, create_comment)

    def test_delete_comment_url(self):
        self.assertEqual(resolve('/post-api/delete-comment/1').func, delete_comment)

    def test_like_post_url(self):
        self.assertEqual(resolve('/post-api/like-post/1').func, like_post)
        
    def test_unlike_post_url(self):
        self.assertEqual(resolve('/post-api/unlike-post/1').func, unlike_post)

    def test_like_comment_url(self):
        self.assertEqual(resolve('/post-api/like-comment/1').func, like_comment)

    def test_unlike_comment_url(self): 
        self.assertEqual(resolve('/post-api/unlike-comment/1').func, unlike_comment)

    def test_get_mentions_url(self): 
        self.assertEqual(resolve('/post-api/get-mentions').func, get_mentions)