import json
import datetime
import base64
import pytz

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.core.files.base import ContentFile

from profiles.views import get_profile_list
from profiles.serializers import PostSerializer, PostLikeSerializer, CommentSerializer, CommentLikeSerializer, NotificationSerializer
from profiles.models import Profile
from .models import *
from .utils import *

# Create your views here.

@api_view(['GET'])
def post_list_view(request, scroll_count):
    profile = Profile.objects.get(user=request.user)
    posts = sort_posts_by_relevance(profile)
    for post in posts[:15 * scroll_count]:
        if profile in post.views.all(): continue
        post.views.add(profile)
        post.save()
    serializer = PostSerializer(posts[:15 * scroll_count], many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_post(request, post_id):
    post = Post.objects.get(id=post_id)
    serializer = PostSerializer(post)
    return Response(serializer.data)

@api_view(['GET'])
def interest_post_list(request, interest):
    hashtag_obj, created = Hashtag.objects.get_or_create(title=interest)
    posts = [post for post in hashtag_obj.posts.all() if post.image]
    posts.extend(post for post in Post.objects.all() if interest in post.content)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def explore_post_list(request):
    profile = Profile.objects.get(user=request.user)
    posts = []
    for interest in profile.interests.all():
        if Hashtag.objects.filter(title=interest.title).exists():
            posts.extend(list(Hashtag.objects.get(title=interest.title).posts.all()))
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def post_notifications(request):
    profile = Profile.objects.get(user=request.user)
    posts = Post.objects.filter(author=profile)
    notifications = []
    now = datetime.datetime.now()
    now = pytz.utc.localize(now)

    for post in posts:
        notification, created = Notification.objects.get_or_create(post=post)
        likes = []
        comments = []
        for like in post.likes.all():
            if (like.profile != profile) and (not like.visualized or now - datetime.timedelta(2) < like.updated):
                likes.append(like)
        for comment in post.comments.all():
            if (comment.author != profile) and (not comment.visualized or now - datetime.timedelta(2) < comment.updated):
                comments.append(comment)

        if notification.likes.all() != post.likes.all() or notification.comments.all() != post.comments.all():
            notification.likes.set(post.likes.all())
            notification.comments.set(post.comments.all())
            notification.notifications_number = len([like for like in likes if not like.visualized]) + len([comment for comment in comments if not comment.visualized])
            notification.save()

        if len(likes) or len(comments):
            notifications.append(notification)

    serializer = NotificationSerializer(notifications, many=True)

    return Response(serializer.data)



@api_view(['GET'])
def visualize_likes(request):
    profile = Profile.objects.get(user=request.user)
    for post in profile.posts.all():
        for like in post.likes.filter(visualized=False):
            like.visualized = True
            like.save()
    return Response('Likes visualized with success')


@api_view(['GET'])
def visualize_comments(request):
    profile = Profile.objects.get(user=request.user)
    for post in profile.posts.all():
        for comments in post.comments.filter(visualized=False):
            comments.visualized = True
            comments.save()
    return Response('Comments visualized with success')


@api_view(['POST'])
def create_post(request):
    profile = Profile.objects.get(user=request.user)
    content = request.data['content']
    hashtags = request.data['hashtags']
    tagged_usernames = request.data['tagged-usernames']

    if len(content) and len(content) <= 500:
        if len(request.data['post-image']):
            format, imgstr = request.data['post-image'].split(';base64,') 
            img_format = format.split('/')[-1] 
            image = ContentFile(base64.b64decode(imgstr), name=profile.user.username + img_format)
            post = Post.objects.create(content=content, author=profile, image=image)
        elif request.data['post-video'] != '':
            post = Post.objects.create(content=content, author=profile, video=request.data['post-video'])
        else:
            post = Post.objects.create(content=content, author=profile)
        
        for hashtag_title in hashtags:
            hashtag, created = Hashtag.objects.get_or_create(title=hashtag_title.lower())
            hashtag.posts.add(post)
            hashtag.save()

        '''for username in tagged_usernames:
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
                post.tagged_profiles.add(Profile.objects.get(user=user))
                post.save()'''

        serializer = PostSerializer(post)
        return Response(serializer.data)
    elif len(content) > 500:
        return Response({
            'message': 'Servidor custa caro! (:'
        })
    else:
        return Response({
            'message': 'Pare de brincar com o HTML! (:'
        })


@api_view(['DELETE'])
def delete_post(request, post_id):
    profile = Profile.objects.get(user=request.user)
    posts = Post.objects.filter(id=post_id, author=profile)
    if posts.exists():
        posts.first().delete()
        return Response(f'Deleted post #{post_id}')
    return Response(f"Post #{post_id} doesn't belongs to you")


@api_view(['POST'])
def create_comment(request):
    profile = Profile.objects.get(user=request.user)
    content = request.data['content']
    post = Post.objects.get(id=request.data['post-id'])

    if request.data['type'] == 'comment':
        parent_comment = Comment.objects.get(id=request.data['parent-comment-id'])
        comment = Comment.objects.create(content=content, author=profile, post=post, layer=parent_comment.layer + 1)
        CommentRelationship.objects.create(parent_comment=parent_comment, comment=comment)
    elif request.data['type'] == 'first-layer-comment':
        comment = Comment.objects.create(content=content, author=profile, post=post, layer=0)

    serializer = CommentSerializer(comment)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_comment(request, comment_id):
    profile = Profile.objects.get(user=request.user)
    comments = Comment.objects.filter(id=comment_id, author=profile)
    if comments.exists():
        comment = comments.first()
        for c in comment.all_child_comments():
            c.delete()
        comment.delete()
        return Response(f'Deleted comment #{comment_id}')
    return Response(f"Comment #{comment_id} doesn't belongs to you")


@api_view(['GET'])
def like_post(request, post_id):
    profile = Profile.objects.get(user=request.user)
    post = Post.objects.get(id=post_id)
    if not PostLike.objects.filter(profile=profile, post=post).exists():
        PostLike.objects.create(profile=profile, post=post)
        return Response(f'Liked post #{post.id}')
    return Response(f'You have already liked post #{post.id}')

def unlike_post(request, post_id):
    profile = Profile.objects.get(user=request.user)
    post = Post.objects.get(id=post_id)
    PostLike.objects.get(profile=profile, post=post).delete()
    return JsonResponse(f'Unliked post #{post.id}', safe=False)

def like_comment(request, comment_id):
    profile = Profile.objects.get(user=request.user)
    comment = Comment.objects.get(id=comment_id)
    if not CommentLike.objects.filter(profile=profile, comment=comment).exists():
        CommentLike.objects.create(profile=profile, comment=comment)
    return JsonResponse(f'Liked comment #{comment.id}', safe=False)

def unlike_comment(request, comment_id):
    profile = Profile.objects.get(user=request.user)
    comment = Comment.objects.get(id=comment_id)
    CommentLike.objects.get(profile=profile, comment=comment).delete()
    return JsonResponse(f'Unliked comment #{comment.id}', safe=False)
