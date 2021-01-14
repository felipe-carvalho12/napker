from django.contrib.auth.models import User
from django.db import models

from profiles.models import Profile

# Create your models here.
class Interest(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self): 
        return self.title


class Post(models.Model):
    content = models.TextField(max_length=50000)
    image = models.ImageField(upload_to='post/', blank=True, null=True)
    video = models.CharField(max_length=1000, blank=True, null=True)
    author = models.ForeignKey(Profile, related_name='posts', on_delete=models.CASCADE)
    views = models.ManyToManyField(Profile, related_name='post_views')
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    tagged_users = models.ManyToManyField(User, related_name='my_mentions', blank=True)
    interests = models.ManyToManyField(Interest, related_name='posts', blank=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.author} - {self.content[:50]}'

    def all_likes(self):
        return self.likes

    def all_comments(self):
        return self.comments

    def all_child_comments_length(self):
        return len(self.comments.all())

    def first_layer_comments(self):
        return self.comments.filter(layer=0)


class Hashtag(models.Model):
    title = models.CharField(max_length=50)
    posts = models.ManyToManyField(Post, related_name='hashtags')

    def __str__(self):
        return self.title


class PostLike(models.Model):
    profile = models.ForeignKey(Profile, related_name='likes', blank=True, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    visualized = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.profile} liked {self.post}'


class Comment(models.Model):
    content = models.TextField(max_length=300)
    author = models.ForeignKey(Profile, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    comments = models.ManyToManyField('self', related_name='related_comments', through='CommentRelationship', blank=True)
    layer = models.IntegerField(default=0)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    visualized = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{self.author.user.username} - {self.content[:50]}'

    def all_likes(self):
        return self.likes

    def all_child_comments(self):
        comment_list = []

        def append_comments(comments):
            for comment in comments:
                comment_list.append(comment)
                append_comments(comment.comments.all())

        append_comments(self.comments.filter(comment_relationship__parent_comment=self).all())

        return comment_list
    
    def all_child_comments_length(self):
        return len(self.all_child_comments())

    def child_comments(self):
        return self.comments.filter(comment_relationship__parent_comment=self)


class CommentRelationship(models.Model):
    parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='parent_comment_relationship', null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_relationship', null=True)

    def __str__(self):
        return f'parent-author: {self.parent_comment.author.user.username} | comment-author: {self.comment.author.user.username}'


class CommentLike(models.Model):
    profile = models.ForeignKey(Profile, related_name='comment_likes', blank=True, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name='likes', on_delete=models.CASCADE)
    visualized = models.BooleanField(default=False)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.profile} liked {self.comment}'


class Notification(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name='notification')
    likes = models.ManyToManyField(PostLike)
    comments = models.ManyToManyField(Comment)
    notifications_number = models.IntegerField(default=0) 
