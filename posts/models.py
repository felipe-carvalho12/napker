from django.contrib.auth.models import User
from django.db import models

from profiles.models import Profile

# Create your models here.


class Post(models.Model):
    content = models.TextField(max_length=500)
    image = models.ImageField(upload_to='post/', blank=True, null=True)
    author = models.ForeignKey(Profile, related_name='posts', on_delete=models.CASCADE)
    views = models.ManyToManyField(Profile, related_name='post_views')
    tagged_profiles = models.ManyToManyField(Profile, related_name='tagged_posts', blank=True)
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.author} - {self.content[:50]}'

    def all_likes(self):
        return self.likes

    def all_comments(self):
        return self.comments


class Hashtag(models.Model):
    title = models.CharField(max_length=50)
    posts = models.ManyToManyField(Post, related_name='hashtags')

    def __str__(self):
        return self.title


class PostLike(models.Model):
    profile = models.ForeignKey(Profile, related_name='likes', blank=True, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    visualized = models.BooleanField(default=False)
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.profile} liked {self.post}'


class Comment(models.Model):
    content = models.TextField(max_length=300)
    author = models.ForeignKey(Profile, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE)
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    visualized = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.author.user.username} - {self.content[:50]}'

    def all_likes(self):
        return self.likes


class CommentLike(models.Model):
    profile = models.ForeignKey(
        Profile, related_name='comment_likes', blank=True, on_delete=models.CASCADE)
    comment = models.ForeignKey(
        Comment, related_name='likes', on_delete=models.CASCADE)
    visualized = models.BooleanField(default=False)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.profile} liked {self.comment}'
