from django.contrib.auth.models import User
from django.db import models

from profiles.models import Profile, InterestSet

# Create your models here.

class Hashtag(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Like(models.Model):
    profile = models.ForeignKey(Profile, related_name='likes', blank=True, on_delete=models.CASCADE)
    visualized = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.profile} liked {self.post}'


class PublicationDetails(models.Model):
    author = models.ForeignKey(Profile, related_name='comments', on_delete=models.CASCADE)
    views = models.ManyToManyField(Profile, related_name='post_views')
    likes = models.ManyToManyField(Like, related_name='post', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    visualized = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.author.user.username} - {self.content[:50]}'

    def all_child_comments(self):
        comment_list = []

        def append_comments(comments):
            for comment in comments:
                comment_list.append(comment)
                append_comments(comment.comments.all())

        append_comments(self.comments.all())

        return comment_list
    
    def all_child_comments_length(self):
        return len(self.all_child_comments())

    def first_layer_child_comments(self):
        return self.comments.all()


class Post(models.Model):
    details = models.OneToOneField(PublicationDetails, related_name='content', on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    image = models.ImageField(upload_to='post/', blank=True, null=True)
    video = models.CharField(max_length=1000, blank=True, null=True)
    interest_set = models.ForeignKey(InterestSet, related_name='posts', blank=True, on_delete=models.SET_NULL)
    tagged_users = models.ManyToManyField(User, related_name='my_mentions', blank=True)
    hashtags = models.ManyToManyField(Hashtag, related_name='posts', blank=True)


class Comment(models.Model):
    details = models.OneToOneField(PublicationDetails, related_name='content', on_delete=models.CASCADE)
    parent = models.ForeignKey(PublicationDetails, related_name='comments', on_delete=models.CASCADE)
    layer = models.IntegerField(default=0)


class Notification(models.Model):
    publication = models.OneToOneField(PublicationDetails, on_delete=models.CASCADE, related_name='notification')
    notifications_number = models.IntegerField(default=0) 
