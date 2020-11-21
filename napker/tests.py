from django.contrib.auth.models import User
from django.test import TestCase, Client


class RouteTests(TestCase):
    def setUp(self):
        u = User.objects.create(username='fred')
        u.set_password('secret')
        u.is_active = True
        u.save()

    def test_home_route(self):
        c = Client()
        c.login(username='fred', password='secret')
        response = c.get('/home')
        self.assertEqual(response.status_code, 200)
