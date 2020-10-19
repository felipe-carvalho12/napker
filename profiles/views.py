from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.shortcuts import render

from .serializers import ProfileSerializer, RelationshipSerializer
from .models import Profile, Relationship

# Create your views here.
@api_view(['GET'])
def get_profile(request, username):
    if list(User.objects.filter(username=username)) != []:
        user = User.objects.get(username=username)
        serializer = ProfileSerializer(Profile.objects.get(user=user))
        return Response(serializer.data)
    else:
        return Response({'bool': 'false'})

@api_view(['GET'])
def filter_profiles(request, query):
    profiles = [profile for profile in Profile.objects.all() if query.lower() in profile.user.username]
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def profile_list(request):
    profiles = Profile.objects.exclude(user=authenticate(request, username='felipe', password='django@12'))
    #profiles = Profile.objects.exclude(user=request.user)
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def my_profile(request):
    profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    #profile = Profile.objects.get(user=request.user)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def invites_received_view(request):
    profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    #profile = Profile.objects.get(user=request.user)
    invites = Relationship.objects.invitations_received(profile)
    serializer = RelationshipSerializer(invites, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def pending_sent_friend_requests(request):
    profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    #profile = Profile.objects.get(user=request.user)
    relationships = [r for r in profile.sender.all() if r.status == 'sent']
    serializer = RelationshipSerializer(relationships, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def reply_friend_request(request):
    profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    #profile = Profile.objects.get(user=request.user)
    sender = Profile.objects.get(id=int(request.data['senderid']))
    reply = request.data['reply']
    r = Relationship.objects.get(sender=sender, receiver=profile, status='sent')
    if reply == 'accept':
        r.status = 'accepted'
        r.save()
    elif reply == 'decline':
        r.delete()
    return Response('Replied with success')
