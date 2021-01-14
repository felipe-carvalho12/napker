from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *

# Create your views here.
@api_view(['POST'])
def feedback(request):
    data = request.data
    Feedback.objects.create(user=request.user, rating=data['rating'], message=data['message'])
    return Response('feedback sent')
