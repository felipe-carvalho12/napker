from django.test import TestCase
from django.urls import resolve, reverse

from settings.views import *

class TestUrls(TestCase):
    def test_feedback_url(self):
        self.assertEqual(resolve('/settings-api/feedback').func, feedback)