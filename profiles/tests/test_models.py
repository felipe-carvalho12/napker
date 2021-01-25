from django.test import TestCase

from profiles.models import *
from posts.models import Post


class TestModels(TestCase):
    def setUp(self):
        self.test_user = User.objects.create(username='bill')


    def test_post_save_create_profile_signal(self):
        self.assertTrue(Profile.objects.filter(user=self.test_user).exists())

    
    def test_add_to_friends_and_remove_from_friends_signal(self):
        test_user_2 = User.objects.create(username='jeff')
        rel = Relationship.objects.create(sender=self.test_user.profile, receiver=test_user_2.profile, status='accepted')

        self.assertIn(self.test_user, test_user_2.profile.friends.all())
        self.assertIn(test_user_2, self.test_user.profile.friends.all())

        rel.delete()

        self.assertNotIn(self.test_user, test_user_2.profile.friends.all())
        self.assertNotIn(test_user_2, self.test_user.profile.friends.all())

    
    def test_profile_save_method(self):
        self.assertEqual(self.test_user.profile.user.username, self.test_user.username)


    def test_profile_get_friends_number_method(self):
        test_user_2 = User.objects.create(username='elon')

        self.assertEqual(self.test_user.profile.get_friends_number(), 0)
        self.assertEqual(test_user_2.profile.get_friends_number(), 0)

        Relationship.objects.create(sender=self.test_user.profile, receiver=test_user_2.profile, status='accepted')

        self.assertEqual(self.test_user.profile.get_friends_number(), 1)
        self.assertEqual(test_user_2.profile.get_friends_number(), 1)

    
    def test_profile_get_posts_number_method(self):
        self.assertEqual(self.test_user.profile.get_posts_number(), 0)

        Post.objects.create(content='Lorem ipsum', author=self.test_user.profile)
        Post.objects.create(content='Hello, world!', author=self.test_user.profile)

        self.assertEqual(self.test_user.profile.get_posts_number(), 2)

    
    def test_profile_get_all_posts_method(self):
        self.assertEqual(list(self.test_user.profile.get_all_posts()), [])

        post1 = Post.objects.create(content='Lorem ipsum', author=self.test_user.profile)
        post2 = Post.objects.create(content='Hello, world!', author=self.test_user.profile)

        self.assertEqual(len(self.test_user.profile.get_all_posts()), 2)
        self.assertEqual(list(self.test_user.profile.get_all_posts()), [post2, post1])

    
    def test_relationship_manager(self):
        test_user_2 = User.objects.create(username='larry')

        self.assertEqual(list(Relationship.objects.invitations_received(self.test_user.profile)), [])
        self.assertEqual(list(Relationship.objects.invitations_received(test_user_2.profile)), [])
        self.assertEqual(list(Relationship.objects.invitations_sent(self.test_user.profile)), [])
        self.assertEqual(list(Relationship.objects.invitations_sent(test_user_2.profile)), [])

        rel = Relationship.objects.create(sender=self.test_user.profile, receiver=test_user_2.profile)

        self.assertEqual(list(Relationship.objects.invitations_received(self.test_user.profile)), [])
        self.assertEqual(list(Relationship.objects.invitations_received(test_user_2.profile)), [rel])
        self.assertEqual(list(Relationship.objects.invitations_sent(self.test_user.profile)), [rel])
        self.assertEqual(list(Relationship.objects.invitations_sent(test_user_2.profile)), [])