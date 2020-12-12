from django.test import TestCase, Client
import datetime
from django.contrib.auth.models import User

from posts.models import Post

# Create your tests here.

class PostTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create(username='mark')
        self.test_user.set_password('1234')
        self.test_user.is_active = True
        self.test_user.save()
        self.test_user.profile.email = 'mark@fakemail.com'
        self.test_user.profile.save()
        self.Post.objects.create(content='Hello, world', author=self.test_user.profile)