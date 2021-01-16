from django.contrib.auth.models import User
from django.test import TestCase, Client

from settings.models import *

class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create(username='jonh')
        self.test_user.is_active = True
        self.test_user.save()

    def test_feedback_view(self):
        self.client.force_login(self.test_user)
        response = self.client.post('/settings-api/feedback', {'rating': 5, 'message': 'Muito bom!'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'feedback sent')
        self.assertEqual(len(Feedback.objects.all()), 1)
        self.assertEqual(Feedback.objects.first().user, self.test_user)
        self.assertEqual(Feedback.objects.first().rating, 5)
        self.assertEqual(Feedback.objects.first().message, 'Muito bom!')