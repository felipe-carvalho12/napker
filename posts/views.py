import json
import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render, redirect

from profiles.views import get_profile_list
from profiles.serializers import PostSerializer, PostLikeSerializer, CommentSerializer, CommentLikeSerializer
from .models import *

# Create your views here.
@api_view(['GET'])
def post_list(request, scroll_count):
    profile = Profile.objects.get(user=request.user)
    profiles = get_profile_list(profile)
    posts = []

    for friend_user in profile.friends.all():
        friend_profile = Profile.objects.get(user=friend_user)
        posts.extend(friend_profile.get_all_posts())
    for p in profiles:
        posts.extend(p.get_all_posts())

    posts.extend(profile.get_all_posts())
    posts = sorted(posts, key=lambda post: post.created)
    posts.reverse()
    serializer = PostSerializer(posts[:5 * scroll_count], many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_post(request, post_id):
    post = Post.objects.get(id=post_id)
    serializer = PostSerializer(post)
    return Response(serializer.data)

@api_view(['GET'])
def post_likes_visualized_on_last_2_days(request):
    profile = Profile.objects.get(user=request.user)
    today = datetime.date.today()
    likes = []
    for post in profile.posts.all():
        for like in post.likes.filter(visualized=True).exclude(profile=profile):
            start_date = today - datetime.timedelta(days=2)
            if like.updated >= start_date and like not in likes:
                likes.append(like)
    serializer = PostLikeSerializer(likes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def post_comments_visualized_on_last_2_days(request):
    profile = Profile.objects.get(user=request.user)
    today = datetime.date.today()
    comments = []
    for post in profile.posts.all():
        for comment in post.comments.filter(visualized=True).exclude(author=profile):
            start_date = today - datetime.timedelta(days=2)
            if comment.updated >= start_date and comment not in comments:
                comments.append(comment)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def unvisualized_post_likes(request):
    profile = Profile.objects.get(user=request.user)
    likes = []
    for post in profile.posts.all():
        for like in post.likes.filter(visualized=False).exclude(profile=profile):
            likes.append(like)
    serializer = PostLikeSerializer(likes, many=True)
    return Response(serializer.data)

def visualize_likes(request):
    profile = Profile.objects.get(user=request.user)
    for post in profile.posts.all():
        for like in post.likes.filter(visualized=False):
            like.visualized = True
            like.save()
    return JsonResponse('Likes visualized with success', safe=False)

@api_view(['GET'])
def unvisualized_post_comments(request):
    profile = Profile.objects.get(user=request.user)
    comments = []
    for post in profile.posts.all():
        for comment in post.comments.filter(visualized=False).exclude(author=profile):
            comments.append(comment)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

def visualize_comments(request):
    profile = Profile.objects.get(user=request.user)
    for post in profile.posts.all():
        for comments in post.comments.filter(visualized=False):
            comments.visualized = True
            comments.save()
    return JsonResponse('Comments visualized with success', safe=False)

def create_post(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        content = request.POST['post-content']
        if len(request.FILES):
            image = request.FILES['post-image']
            Post.objects.create(content=content, author=profile, image=image)
        else:
            Post.objects.create(content=content, author=profile)
        return redirect('/')

def delete_post(request, post_id):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        posts = Post.objects.filter(id=post_id, author=profile)
        if posts.exists(): posts.first().delete()
        return JsonResponse(f'Deleted post #{post_id}', safe=False)

def comment_post(request, post_id):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        content = request.POST['comment-content']
        post = Post.objects.get(id=post_id)
        Comment.objects.create(content=content, author=profile, post=post)
        return redirect(f'/post/{post_id}')

def delete_comment(request, comment_id):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        comments = Comment.objects.filter(id=comment_id, author=profile)
        if comments.exists(): comments.first().delete()
        return JsonResponse(f'Deleted comment #{comment_id}', safe=False)

def like_post(request, post_id):
    profile = Profile.objects.get(user=request.user)
    post = Post.objects.get(id=post_id)
    if not PostLike.objects.filter(profile=profile, post=post).exists():
        PostLike.objects.create(profile=profile, post=post)
    return JsonResponse(f'Liked post #{post.id}', safe=False)

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
