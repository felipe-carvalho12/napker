from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from .serializers import ProfileSerializer
from .models import Profile

# Create your views here.
@api_view(['GET'])
def profile_list(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)
