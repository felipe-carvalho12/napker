from django.test import TestCase, Client
from django.urls import resolve, reverse

from napker.views import (
    login_view, logout_view, signup_view, add_interests_view, activate_account_view,
    update_profile, reset_password, reset_password_confirm, reset_password_complete,
    change_password, delete_account
)


class TestUrls(TestCase):
    def test_login_url(self):
        self.assertEqual(resolve('/post-login').func, login_view)

    def test_logout_url(self):
        self.assertEqual(resolve('/logout').func, logout_view)

    def test_signup_url(self):
        self.assertEqual(resolve('/post-signup').func, signup_view)

    def test_add_interests_url(self):
        self.assertEqual(resolve('/post-signup/interests').func, add_interests_view)

    def test_activate_account_url(self):
        url = reverse('activate', args=['some_uidb64', 'some_token'])
        self.assertEqual(resolve(url).func, activate_account_view)

    def test_update_profile_url(self):
        self.assertEqual(resolve('/update-profile').func, update_profile)

    def test_reset_password_url(self):
        self.assertEqual(resolve('/post-reset-password').func, reset_password)

    def test_reset_password_confirm_url(self):
        url = reverse('reset', args=['some_uidb64', 'some_token'])
        self.assertEqual(resolve(url).func, reset_password_confirm)

    def test_reset_password_complete_url(self):
        url = reverse('password_reset_complete')
        self.assertEqual(resolve(url).func, reset_password_complete)

    def test_change_password_url(self):
        self.assertEqual(resolve('/change-password').func, change_password)

    def test_delete_account_url(self):
        self.assertEqual(resolve('/delete-account').func, delete_account)

    def test_api_urls(self):
        pass

