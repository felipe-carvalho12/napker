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
def get_post_id_list(request, scroll_count):
    profile = request.user.profile
    light_posts_arrs = sort_posts_by_relevance(profile)
    light_posts_dicts = list(map(lambda data: {
        'id': data[0],
        'interest_points': data[1] / 12,
        'age_points': data[2] / 12,
        'friends_points': data[3] / 12,
        'is_friend_boolean': data[4] / 12,

        'date_points': data[5] / 3,
        'likes_points': data[6] / 3,
    }, light_posts_arrs))
    serializer = PostId01Serializer(light_posts_dicts[:1000 * scroll_count], many=True)
    return Response(serializer.data)


@api_view(['POST'])
def get_post_list(request):
    posts_id = request.data
    posts = sorted(Post.objects.filter(details_id__in=posts_id), key=lambda post: posts_id.index(post.details.id))
    serializer = Post01Serializer(posts, many=True)
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

    posts = []
    for interest_set in interest_obj.interest_sets.all():
        posts.extend(interest_set.posts.exclude(id__in=[post.id for post in posts]))
    
    posts.extend(hashtag_obj.posts.all())
    
    posts = sort_posts_by_relevance(profile, posts) if len(posts) else []
    serializer = Post01Serializer(Post.objects.filter(id__in=[post_id[0] for post_id in posts]), many=True)

    return Response(serializer.data)


@api_view(['GET'])
def explore_post_list(request):
    profile = request.user.profile
    posts = []

    def extend_posts(interest):
        hashtag_obj, created = Hashtag.objects.get_or_create(title=interest.title)

        for interest_set in interest.interest_sets.all():
            posts.extend(interest_set.posts.exclude(id__in=[post.id for post in posts]))

        posts.extend(hashtag_obj.posts.exclude(id__in=[post.id for post in posts]))

    if profile.interest_set.interests.exists():
        for interest in profile.interest_set.interests.all():
            extend_posts(interest)
    else:
        for interest in sorted(Interest.objects.all(), key=lambda interest: sum([len(interest_set.profiles) for interest_set in interest.interest_sets.all()]))[:10]:
            extend_posts(interest)

    posts = sort_posts_by_relevance(profile, posts) if len(posts) else []
    serializer = Post01Serializer(Post.objects.filter(id__in=[post_id[0] for post_id in posts]), many=True)
    return Response(serializer.data)


@api_view(['GET'])
def mention_notifications_number(request):
    return Response(len(Mention.objects.filter(user=request.user, visualized=False)))


@api_view(['GET'])
def post_mention_notifications(request):
    now = datetime.datetime.now()
    now = pytz.utc.localize(now)
    mentions = list(filter(lambda mention: hasattr(mention.publication, 'post'), request.user.mentions.all()))
    mentions = list(filter(lambda mention: not mention.visualized or now - datetime.timedelta(2) < mention.updated, mentions))

    serializer = PostMentionSerializer(mentions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def comment_mention_notifications(request):
    now = datetime.datetime.now()
    now = pytz.utc.localize(now)
    mentions = list(filter(lambda mention: hasattr(mention.publication, 'comment'), request.user.mentions.all()))
    mentions = list(filter(lambda mention: not mention.visualized or now - datetime.timedelta(2) < mention.updated, mentions))

    serializer = CommentMentionSerializer(mentions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def visualize_mentions(request):
    Mention.objects.filter(user=request.user, visualized=False).update(visualized=True)

    return Response('Mentions visualized with success')


@api_view(['GET'])
def publication_notification_number(request):
    profile = request.user.profile
    counter = 0

    for publication in profile.publications.all():

        notifications_number = len(publication.likes.filter(visualized=False).exclude(profile=profile)) + len(publication.comments.filter(visualized=False).exclude(details__author=profile))

        if hasattr(publication, 'post') and hasattr(publication.post, 'notification'):
            publication.post.notification.details.notifications_number = notifications_number
            publication.post.notification.details.save()

            counter += notifications_number
        elif hasattr(publication, 'comment') and hasattr(publication.comment, 'notification'):
            publication.comment.notification.details.notifications_number =  notifications_number
            publication.comment.notification.details.save()

            counter += notifications_number
        
    return Response(counter)



@api_view(['GET'])
def post_notifications(request):
    profile = request.user.profile
    notifications = []
    now = datetime.datetime.now()
    now = pytz.utc.localize(now)

    for publication in [pub for pub in profile.publications.all() if hasattr(pub, 'post')]:
        if NotificationDetails.objects.filter(post_notification__post=publication.post).exists():
            notification_details = NotificationDetails.objects.get(post_notification__post=publication.post)
            notification = notification_details.post_notification
        else:
            notification_details = NotificationDetails.objects.create()
            notification = PostNotification.objects.create(details=notification_details, post=publication.post)

        likes = []
        comments = []
        for like in publication.likes.all():
            if (like.profile != profile) and (not like.visualized or now - datetime.timedelta(2) < like.updated):
                likes.append(like)
        for comment in publication.comments.all():
            if (comment.details.author != profile) and (not comment.visualized or now - datetime.timedelta(2) < comment.details.updated):
                comments.append(comment)

        notification_details.notifications_number = len([like for like in likes if not like.visualized]) + len([comment for comment in comments if not comment.visualized])
        notification_details.save()

        if len(likes) or len(comments):
            notifications.append(notification)

    serializer = PostNotificationsSerializer(notifications, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def comment_notifications(request):
    profile = request.user.profile
    publications = PublicationDetails.objects.filter(author=profile)
    notifications = []
    now = datetime.datetime.now()
    now = pytz.utc.localize(now)

    for publication in [pub for pub in publications.all() if hasattr(pub, 'comment')]:
        if NotificationDetails.objects.filter(comment_notification__comment=publication.comment).exists():
            notification_details = NotificationDetails.objects.get(comment_notification__comment=publication.comment)
            notification = notification_details.comment_notification
        else:
            notification_details = NotificationDetails.objects.create()
            notification = CommentNotification.objects.create(details=notification_details, comment=publication.comment)

        likes = []
        comments = []
        for like in publication.likes.all():
            if (like.profile != profile) and (not like.visualized or now - datetime.timedelta(2) < like.updated):
                likes.append(like)
        for comment in publication.comments.all():
            if (comment.details.author != profile) and (not comment.visualized or now - datetime.timedelta(2) < comment.details.updated):
                comments.append(comment)

        notification_details.notifications_number = len([like for like in likes if not like.visualized]) + len([comment for comment in comments if not comment.visualized])
        notification_details.save()

        if len(likes) or len(comments):
            notifications.append(notification)

    serializer = CommentNotificationsSerializer(notifications, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def visualize_likes(request):
    profile = request.user.profile
    for publication in profile.publications.all():
        publication.likes.filter(visualized=False).update(visualized=True)
    return Response('Likes visualized with success')


@api_view(['GET'])
def visualize_comments(request):
    profile = request.user.profile
    for publication in profile.publications.all():
        publication.comments.filter(visualized=False).update(visualized=True)
    return Response('Comments visualized with success')


@api_view(['POST'])
def create_post(request):
    profile = request.user.profile
    raw_content = request.data['content']
    content = ''.join([block['text'] for block in json.loads(raw_content)['blocks']])
    hashtags = re.findall(r'\#(\w+)', content)
    
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
                Mention.objects.create(user=user, publication=details)

        for int_title in interests:
            interest, created = Interest.objects.get_or_create(title=int_title)
            try:
                interest_set = InterestSet.objects.get(interests=[interest])
            except:
                interest_set = InterestSet.objects.create()
                interest_set.interests.set([interest])
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
            Mention.objects.create(user=user, publication=details)

    serializer = Comment01Serializer(comment)
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
