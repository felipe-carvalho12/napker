from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render

from .serializers import ProfileSerializer, RelationshipSerializer, UserSerializer
from .models import Profile, Relationship

# Create your views here.
@api_view(['GET'])
def get_logged_user(request):
    #serializer = UserSerializer(User.objects.get(username='felipe'))
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
def get_profile(request, slug):
    if User.objects.filter(username=slug).exists():
        user = User.objects.get(username=slug)
        serializer = ProfileSerializer(Profile.objects.get(user=user))
        return Response(serializer.data)
    else:
        return Response({'bool': 'false'})

@api_view(['GET'])
def filter_profiles(request, query):
    #user = authenticate(request, username='felipe', password='django@12')
    #profiles = [profile for profile in Profile.objects.all() if query.lower() in profile.user.username and profile.user != user]
    profiles = [profile for profile in Profile.objects.all() if query.lower() in profile.user.username and profile.user != request.user]
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def profile_list(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    profiles = []
    for p in Profile.objects.all():
        if p == profile: continue
        if p.user in profile.friends.all(): continue
        if p in [i.receiver for i in Relationship.objects.invitations_sent(profile)]: continue
        if p in [i.sender for i in Relationship.objects.invitations_received(profile)]: continue
        profiles.append(p)
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def my_profile(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def friends_profiles(request, slug):
    user = User.objects.get(username=slug)
    profile = Profile.objects.get(user=user)
    friends = [friend_user.profile for friend_user in profile.friends.all()]
    serializer = ProfileSerializer(friends, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_relationship(request, slug):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    other_user = User.objects.get(username=slug)
    other_profile = Profile.objects.get(user=other_user)
    if profile.friends.filter(username=slug).exists():
        return Response({'relationship': 'friends'})
    else:
        relationships = [r for r in profile.sender.all() if r.status == 'sent']
        for r in relationships:
            if other_profile == r.receiver:
                return Response({'relationship': 'invite-sent'})
        relationships = Relationship.objects.invitations_received(profile)
        for r in relationships:
            if other_profile == r.sender:
                return Response({'relationship': 'invite-received'})
        return Response({'relationship': 'none'})

@api_view(['GET'])
def friend_requests_received(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    invites = Relationship.objects.invitations_received(profile)
    serializer = RelationshipSerializer(invites, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def pending_sent_friend_requests(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    relationships = [r for r in profile.sender.all() if r.status == 'sent']
    serializer = RelationshipSerializer(relationships, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def remove_from_friends(request):
    if request.method == 'POST':
        #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
        profile = Profile.objects.get(user=request.user)
        other_profile = Profile.objects.get(id=int(request.data))
        relationship = Relationship.objects.filter(Q(sender=profile) | Q(sender=other_profile), Q(receiver=profile) | Q(receiver=other_profile), status='accepted').first()
        relationship.delete()
        return Response('Removed from friends with success')
        

@api_view(['POST'])
def send_friends_request(request):
    if request.method == 'POST':
        #sender = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
        sender = Profile.objects.get(user=request.user)
        receiver = Profile.objects.get(id=int(request.data))
        if Relationship.objects.filter(Q(sender=sender) | Q(sender=receiver), Q(receiver=sender) | Q(receiver=receiver)).exists():
            return Response('Users already have a relationship')
        Relationship.objects.create(sender=sender, receiver=receiver, status='sent')
        return Response('Friend request sent')

@api_view(['POST'])
def cancel_friend_request(request):
    if request.method == 'POST':
        #sender = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
        sender = Profile.objects.get(user=request.user)
        receiver = Profile.objects.get(id=int(request.data))
        r = Relationship.objects.get(sender=sender, receiver=receiver, status='sent')
        r.delete()
        return Response('Friend request canceled')

@api_view(['POST'])
def reply_friend_request(request):
    #profile = Profile.objects.get(user=authenticate(request, username='felipe', password='django@12'))
    profile = Profile.objects.get(user=request.user)
    sender = Profile.objects.get(id=int(request.data['senderid']))
    reply = request.data['reply']
    r = Relationship.objects.get(sender=sender, receiver=profile, status='sent')
    if reply == 'accept':
        r.status = 'accepted'
        r.save()
    elif reply == 'decline':
        r.delete()
    return Response('Replied with success')
