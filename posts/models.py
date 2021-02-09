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
        return f'{self.profile} liked {self.publication}'


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
        return f'{self.author.user.username} - layer {self.layer}'
    
    def all_comments(self):
        comment_list = []

        def append_comments(comments):
            for comment in comments:
                comment_list.append(comment)
                append_comments([comment for comment in comment.details.comments.all()])

        append_comments([comment for comment in self.comments.all()])

        return comment_list

    @property
    def all_comments_length(self):
        return len(self.all_comments())

    @property
    def first_layer_comments(self):
        return self.comments.all()

    @property
    def first_layer_comments_length(self):
        return len(self.comments.all())
    
    @property
    def likes_profile_id(self):
        return [like.profile.id for like in self.likes.all()]

    @property
    def likes_profiles(self):
        return [like.profile for like in self.likes.all()]


class Mention(models.Model):
    user = models.ForeignKey(User, related_name='mentions', on_delete=models.CASCADE)
    publication = models.ForeignKey(PublicationDetails, related_name='mentions', on_delete=models.CASCADE)
    visualized = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'mention - {self.user.username}'


class Post(models.Model):
    details = models.OneToOneField(PublicationDetails, related_name='post', on_delete=models.CASCADE)
    content = models.TextField(max_length=100000)
    image = models.ImageField(upload_to='post/', blank=True, null=True)
    video = models.CharField(max_length=1000, blank=True, null=True)
    interest_set = models.ForeignKey(InterestSet, related_name='posts', blank=True, on_delete=models.SET_NULL, null=True)
    hashtags = models.ManyToManyField(Hashtag, related_name='posts', blank=True)


class Comment(models.Model):
    details = models.OneToOneField(PublicationDetails, related_name='comment', on_delete=models.CASCADE)
    content = models.TextField(max_length=100000)
    parent = models.ForeignKey(PublicationDetails, related_name='comments', on_delete=models.CASCADE)
    hashtags = models.ManyToManyField(Hashtag, related_name='comments', blank=True)
    visualized = models.BooleanField(default=False)

    @property
    def comments(self):
        comment_list = []

        def append_comments(comments):
            for comment in comments:
                comment_list.append(comment)
                append_comments([comment for comment in comment.details.comments.all()])

        append_comments([comment for comment in self.details.comments.all()])

        return comment_list

    @property
    def first_layer_comments(self):
        return self.details.comments.all()


class NotificationDetails(models.Model):
    notifications_number = models.IntegerField(default=0)


class PostNotification(models.Model):
    details = models.OneToOneField(NotificationDetails, related_name='post_notification', on_delete=models.CASCADE)
    post = models.OneToOneField(Post, related_name='notification', on_delete=models.CASCADE)


class CommentNotification(models.Model):
    details = models.OneToOneField(NotificationDetails, related_name='comment_notification', on_delete=models.CASCADE)
    comment = models.OneToOneField(Comment, related_name='notification', on_delete=models.CASCADE)
