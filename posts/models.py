from django.contrib.auth.models import User
from django.db import models

from profiles.models import Profile

# Create your models here.
class Post(models.Model):
    content = models.TextField(max_length=300)
    image = models.ImageField(upload_to='', blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)
    author = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.author.username} - {self.content[:15]}'

    def likes_number(self):
        return self.likes.all().count()

    def comments_number(self):
        return self.comments.all().count()

    class Meta:
        ordering = ('-created',)


class Comment(models.Model):
    content = models.TextField(max_length=300)
    author = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.author.username} - {self.content[:15]}'