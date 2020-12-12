from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='feedbacks', null=True)
    rating = models.IntegerField(choices=((1, 1), (2, 2), (3, 3), (4, 4), (5, 5)))
    message = models.TextField(max_length=100)

    def __str__(self):
        return f'{self.rating} - {self.message[:20]}'