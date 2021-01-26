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
    author = models.ForeignKey(Profile, related_name='publications', on_delete=models.CASCADE)
    views = models.ManyToManyField(Profile, related_name='post_views')
    likes = models.ManyToManyField(Like, related_name='publication', blank=True)
    layer = models.IntegerField(default=0)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.author.user.username} - {self.content[:50]}'

    @property
    def comments(self):
        comment_list = []

        def append_comments(comments):
            for comment in comments:
                comment_list.append(comment)
                append_comments([comment.details for comment in comment.comments.all()])

        append_comments([comment.details for comment in self.comments.all()])

        return comment_list
    
    def comments_length(self):
        return len(self.comments.all())

    def first_layer_comments(self):
        return self.comments.all()
    
    def likes_profile_id(self):
        return [like.profile.id for like in self.likes.all()]

    def likes_profiles(self):
        return [like.profile for like in self.likes.all()]


class Post(models.Model):
    details = models.OneToOneField(PublicationDetails, related_name='post', on_delete=models.CASCADE)
    content = models.TextField(max_length=100000)
    image = models.ImageField(upload_to='post/', blank=True, null=True)
    video = models.CharField(max_length=1000, blank=True, null=True)
    interest_set = models.ForeignKey(InterestSet, related_name='posts', blank=True, on_delete=models.SET_NULL, null=True)
    tagged_users = models.ManyToManyField(User, related_name='post_mentions', blank=True)
    hashtags = models.ManyToManyField(Hashtag, related_name='posts', blank=True)


class Comment(models.Model):
    details = models.OneToOneField(PublicationDetails, related_name='comment', on_delete=models.CASCADE)
    content = models.TextField(max_length=100000)
    parent = models.ForeignKey(PublicationDetails, related_name='comments', on_delete=models.CASCADE)
    tagged_users = models.ManyToManyField(User, related_name='comment_mentions', blank=True)
    hashtags = models.ManyToManyField(Hashtag, related_name='comments', blank=True)
    visualized = models.BooleanField(default=False)


class Notification(models.Model):
    publication = models.OneToOneField(PublicationDetails, on_delete=models.CASCADE, related_name='notification')
    notifications_number = models.IntegerField(default=0) 
