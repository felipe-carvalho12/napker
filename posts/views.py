import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render

from profiles.serializers import PostSerializer, CommentSerializer
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
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

def create_post(request):
    if request.method == 'POST':
        #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
        profile = Profile.objects.get(user=request.user)
        data = json.loads(request.body)
        Post.objects.create(content=data['content'], author=profile)
        return JsonResponse('Post created with success', safe=False)
