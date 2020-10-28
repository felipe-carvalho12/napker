import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render

from .serializers import *
from .models import *

# Create your views here.
def create_post(request):
    if request.method == 'POST':
        #Post.objects.create(content=json.loads(request.body), author=authenticate(request, username='felipe', password='django@12'))
        Post.objects.create(content=json.loads(request.body), author=request.user)
        return JsonResponse('Post created with success', safe=False)