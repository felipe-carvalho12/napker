from django.test import TestCase, Client
from django.urls import resolve, reverse

from profiles.views import *


class TestUrls(TestCase):
    def test_is_logged_url(self):
        self.assertEqual(resolve('/profile-api/is-logged').func, is_logged)


    def test_get_logged_user_url(self):
        self.assertEqual(resolve('/profile-api/logged-user').func, get_logged_user)


    def test_get_profile_url(self):
        self.assertEqual(resolve('/profile-api/user/some_slug').func, get_profile)


    def test_get_profile_by_email_url(self):
        self.assertEqual(resolve('/profile-api/profile-by-email/some_email').func, get_profile_by_email)


    def test_filter_profiles_url(self):
        self.assertEqual(resolve('/profile-api/users/some_query').func, filter_profiles)


    def test_filter_profiles_by_interests_url(self):
        self.assertEqual(resolve('/profile-api/users-by-interest/some_query').func, filter_profiles_by_interests)


    def test_myprofile_list_url(self):
        self.assertEqual(resolve('/profile-api/myprofile-list/1').func, myprofile_list_view)


    def test_profile_list_url(self):
        self.assertEqual(resolve('/profile-api/profile-list/some_slug').func, profile_list_view)


    def test_interest_profile_list_url(self):
        self.assertEqual(resolve('/profile-api/interest-profile-list/some_interests').func, interest_profile_list)
    

    def test_my_profile_url(self):
        self.assertEqual(resolve('/profile-api/myprofile').func, my_profile)
    

    def test_get_weights_url(self):
        self.assertEqual(resolve('/profile-api/get-weights').func, get_weights)

    
    def test_set_weights_url(self):
        self.assertEqual(resolve('/profile-api/set-weights').func, set_weights)


    def test_friends_profiles_url(self):
        self.assertEqual(resolve('/profile-api/get-friends-profiles/some_slug').func, friends_profiles)


    def test_blocked_profiles_url(self):
        self.assertEqual(resolve('/profile-api/get-blocked-profiles').func, blocked_profiles)


    def test_get_relationship_url(self):
        self.assertEqual(resolve('/profile-api/relationship/some_slug').func, get_relationship)


    def test_friend_requests_received_url(self):
        self.assertEqual(resolve('/profile-api/myinvites').func, friend_requests_received)


    def test_remove_from_friends_url(self):
        self.assertEqual(resolve('/profile-api/remove-from-friends').func, remove_from_friends)


    def test_send_friend_request_url(self):
        self.assertEqual(resolve('/profile-api/send-friend-request').func, send_friend_request)


    def test_cancel_friend_request_url(self):
        self.assertEqual(resolve('/profile-api/cancel-friend-request').func, cancel_friend_request)


    def test_reply_friend_request_url(self):
        self.assertEqual(resolve('/profile-api/reply-friend-request').func, reply_friend_request)


    def test_block_profile_url(self):
        self.assertEqual(resolve('/profile-api/block-user').func, block_profile)


    def test_unblock_profile_url(self):
        self.assertEqual(resolve('/profile-api/unblock-user').func, unblock_profile)


    def test_set_myinterests_url(self):
        self.assertEqual(resolve('/profile-api/set-myinterests').func, set_myinterests)