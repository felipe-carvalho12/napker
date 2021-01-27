import json
import datetime
import base64
import pytz
import re

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.core.files.base import ContentFile

from profiles.views import get_profile_list
from profiles.serializers import *
from profiles.models import Profile
from .models import *
from .utils import *

# Create your views here.

@api_view(['GET'])
def post_list_view(request, scroll_count):
    profile = request.user.profile
    posts = sort_posts_by_relevance(profile)
    for post in posts[:15 * scroll_count]:
        if profile in post.details.views.all(): continue
        post.details.views.add(profile)
        post.details.save()
    serializer = Post01Serializer(posts[:15 * scroll_count], many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_post(request, post_id):
    post = Post.objects.get(id=post_id)
    serializer = Post02Serializer(post)
    return Response(serializer.data)


@api_view(['GET'])
def get_likes(request, publication_id):
    publication = PublicationDetails.objects.get(id=publication_id)
    serializer = Profile01Serializer(publication.likes_profiles, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def interest_post_list(request, interest):
    profile = request.user.profile
    interest_obj, created = Interest.objects.get_or_create(title=interest)
    hashtag_obj, created = Hashtag.objects.get_or_create(title=interest)

    posts = list(tuple([i.posts for i in interest_obj.interest_set]))
    posts.extend(list(hashtag_obj.posts.exclude(id__in=[post.id for post in posts])))
    posts = sort_posts_by_relevance(profile, posts)
    serializer = Post01Serializer(posts, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def explore_post_list(request):
    profile = request.user.profile
    posts = []
    for interest in profile.interests:
        interest_obj, created = Interest.objects.get_or_create(title=interest.title)
        hashtag_obj, created = Hashtag.objects.get_or_create(title=interest.title)
        posts.extend(list(interest_obj.posts.all()))
        posts.extend(list(hashtag_obj.posts.exclude(id__in=[post.id for post in posts])))

    posts = sort_posts_by_relevance(profile, posts)
    serializer = Post01Serializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def publication_notifications(request):
    profile = request.user.profile
    publications = PublicationDetails.objects.filter(author=profile)
    notifications = []
    now = datetime.datetime.now()
    now = pytz.utc.localize(now)

    for publication in publications:
        notification, created = Notification.objects.get_or_create(publication=publication)
        likes = []
        comments = []
        for like in publication.likes.all():
            if (like.profile != profile) and (not like.visualized or now - datetime.timedelta(2) < like.updated):
                likes.append(like)
        for comment in publication.comments.all():
            if (comment.details.author != profile) and (not comment.visualized or now - datetime.timedelta(2) < comment.details.updated):
                comments.append(comment)

        notification.notifications_number = len([like for like in likes if not like.visualized]) + len([comment for comment in comments if not comment.visualized])
        notification.save()

        if len(likes) or len(comments):
            notifications.append(notification)

    serializer = NotificationSerializer(notifications, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def visualize_likes(request):
    profile = request.user.profile
    for publication in profile.publications.all():
        for like in publication.likes.filter(visualized=False):
            like.visualized = True
            like.save()
    return Response('Likes visualized with success')


@api_view(['GET'])
def visualize_comments(request):
    profile = request.user.profile
    for publication in profile.publications.all():
        for comment in publication.comments.filter(visualized=False):
            comment.visualized = True
            comment.save()
    return Response('Comments visualized with success')


@api_view(['POST'])
def create_post(request):
    profile = request.user.profile
    raw_content = request.data['content']
    content = ''.join([block['text'] for block in json.loads(raw_content)['blocks']])
    hashtags = re.findall(r' \#(\w+) ', content)
    tagged_usernames = request.data['tagged-usernames']
    interests = request.data['interests']

    details = PublicationDetails.objects.create(author=profile)

    if len(content) <= 500:
        if len(request.data['post-image']):
            format, imgstr = request.data['post-image'].split(';base64,') 
            img_format = format.split('/')[-1] 
            image = ContentFile(base64.b64decode(imgstr), name=profile.user.username + img_format)
            post = Post.objects.create(details=details, content=raw_content, image=image)
        elif request.data['post-video'] != '':
            post = Post.objects.create(details=details, content=raw_content, video=request.data['post-video'])
        else:
            if not len(content):
                return Response({'message': 'Pare de brincar com o HTML! (:'})
            post = Post.objects.create(details=details, content=raw_content)
        
        for hashtag_title in hashtags:
            hashtag, created = Hashtag.objects.get_or_create(title=hashtag_title.lower())
            post.hashtags.add(hashtag)
            post.save()

        for username in tagged_usernames:
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
                post.tagged_users.add(user)
                post.save()

        for int_title in interests:
            interest, created = Interest.objects.get_or_create(title=int_title)
            interest_set, created = InterestSet.objects.get_or_create(interests=[interest])
            post.interest_set = interest_set
            post.save()

        serializer = Post01Serializer(post)
        return Response(serializer.data)
    else:
        return Response({
            'message': 'Servidor custa caro! (:'
        })


@api_view(['POST'])
def create_comment(request):
    profile = request.user.profile
    raw_content = request.data['content']
    content = ''.join([block['text'] for block in json.loads(raw_content)['blocks']])
    hashtags = re.findall(r' \#(\w+) ', content)
    tagged_usernames = request.data['tagged-usernames']
    parent = PublicationDetails.objects.get(id=request.data['parent-id'])

    details = PublicationDetails.objects.create(author=profile, layer=parent.layer + 1)
    comment = Comment.objects.create(details=details, parent=parent, content=raw_content)

    for hashtag_title in hashtags:
            hashtag, created = Hashtag.objects.get_or_create(title=hashtag_title.lower())
            comment.hashtags.add(hashtag)
            comment.save()

    for username in tagged_usernames:
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            comment.tagged_users.add(user)
            comment.save()

    serializer = CommentSerializer(comment)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_publication(request, publication_id):
    profile = request.user.profile
    try:
        PublicationDetails.objects.get(id=publication_id, author=profile).delete()
        return Response(f'Deleted publication #{publication_id}')
    except:
        return Response(f"Publication #{publication_id} doesn't belongs to you")


@api_view(['POST'])
def like_publication(request, publication_id):
    profile = request.user.profile
    publication = PublicationDetails.objects.get(id=publication_id)
    if not Like.objects.filter(profile=profile, publication=publication).exists():
        like = Like.objects.create(profile=profile)
        publication.likes.add(like)
        publication.save()
        return Response(f'Liked post #{publication.id}')
    return Response(f'You have already liked post #{publication.id}')


@api_view(['POST'])
def unlike_publication(request, publication_id):
    publication = PublicationDetails.objects.get(id=publication_id)
    try:
        Like.objects.get(profile=request.user.profile, publication=publication).delete()
        return Response(f'Unliked post #{publication.id}')
    except:
        return Response('Like not found')


@api_view(['GET'])
def get_mentions(request):
    profiles = Profile.objects.filter(user__is_active=True).exclude(user=request.user)
    serializer = Profile04Serializer(profiles, many=True)
    return Response(serializer.data)
