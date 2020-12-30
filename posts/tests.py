from django.test import TestCase, Client
import datetime
from django.contrib.auth.models import User

from profiles.models import *
from .models import *

# Create your tests here.

class PostTest(TestCase):
    def setUp(self):
        self.client = Client()
