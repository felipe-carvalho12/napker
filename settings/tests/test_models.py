from django.test import TestCase

from settings.models import *

class TestModels(TestCase):
    def setUp(self):
        self.test_user = User.objects.create(username='bill')

    def 
        self.test_feedback = Feedback.objects.create(user=, rating=, message=, created=)
