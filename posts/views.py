import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render

from profiles.serializers import PostSerializer, PostLikeSerializer, CommentSerializer, CommentLikeSerializer
from .models import *

# Create your views here.
@api_view(['GET'])
def post_list(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    posts = list(profile.get_all_posts())
    for friend_user in profile.friends.all():
        friend_profile = Profile.objects.get(user=friend_user)
        posts.extend(friend_profile.get_all_posts())
    posts = sorted(posts, key=lambda post: post.created)
    posts.reverse()
    serializer = PostSerializer(posts[:50], many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_post(request, post_id):
    post = Post.objects.get(id=post_id)
    serializer = PostSerializer(post)
    return Response(serializer.data)

@api_view(['GET'])
def unvisualized_post_likes(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    likes = []
    for post in profile.posts.all():
        for like in post.likes.filter(visualized=False).exclude(profile=profile):
            likes.append(like)
    serializer = PostLikeSerializer(likes, many=True)
    return Response(serializer.data)

def visualize_likes(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    for post in profile.posts.all():
        for like in post.likes.filter(visualized=False):
            like.visualized = True
            like.save()
    return JsonResponse('Likes visualized with success', safe=False)

@api_view(['GET'])
def unvisualized_post_comments(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    comments = []
    for post in profile.posts.all():
        for comment in post.comments.filter(visualized=False).exclude(author=profile):
            comments.append(comment)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

def visualize_comments(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    for post in profile.posts.all():
        for comments in post.comments.filter(visualized=False):
            comments.visualized = True
            comments.save()
    return JsonResponse('Comments visualized with success', safe=False)

def create_post(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        data = json.loads(request.body)
        Post.objects.create(content=data['content'], author=profile)
        return JsonResponse('Post created with success', safe=False)

def delete_post(request, post_id):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        post = Post.objects.filter(id=post_id, author=profile)
        if post.exists(): post.first().delete()
        return JsonResponse(f'Deleted post #{post.id}', safe=False)

def comment_post(request, post_id):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        data = json.loads(request.body)
        post = Post.objects.get(id=post_id)
        comment = Comment.objects.create(content=data['comment'], author=profile, post=post)
        return JsonResponse(f'Commented post #{post.id}', safe=False)

def delete_comment(request, comment_id):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        comment = Comment.objects.filter(id=comment_id, author=profile)
        if comment.exists(): comment.first().delete()
        return JsonResponse(f'Deleted comment #{comment.id}', safe=False)

def like_post(request, post_id):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    post = Post.objects.get(id=post_id)
    if not PostLike.objects.filter(profile=profile, post=post).exists():
        PostLike.objects.create(profile=profile, post=post)
    return JsonResponse(f'Liked post #{post.id}', safe=False)

def unlike_post(request, post_id):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    post = Post.objects.get(id=post_id)
    PostLike.objects.get(profile=profile, post=post).delete()
    return JsonResponse(f'Unliked post #{post.id}', safe=False)

def like_comment(request, comment_id):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    comment = Comment.objects.get(id=comment_id)
    if not CommentLike.objects.filter(profile=profile, comment=comment).exists():
        CommentLike.objects.create(profile=profile, comment=comment)
    return JsonResponse(f'Liked comment #{comment.id}', safe=False)

def unlike_comment(request, comment_id):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    comment = Comment.objects.get(id=comment_id)
    CommentLike.objects.get(profile=profile, comment=comment).delete()
    return JsonResponse(f'Unliked comment #{comment.id}', safe=False)
