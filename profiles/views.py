import random
import re

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render

from .serializers import *
from .models import *
from .utils import *

# Create your views here.

@api_view(['GET'])
def is_logged(request):
    return Response(request.user.is_authenticated)


@api_view(['GET'])
def my_username(request):
    return Response(request.user.username)


@api_view(['GET'])
def get_profile01(request, username):
    profile = User.objects.get(username=username)
    serializer = Profile01Serializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def get_profile02(request, username):
    profile = User.objects.get(username=username)
    serializer = Profile02Serializer(profile)
    return Response(serializer.data)


@api_view(['GET'])
def username_is_taken(request, username):
    user = User.objects.filter(username=username)
    return Response(user.exists())


@api_view(['GET'])
def email_is_taken(request, email):
    profile =  Profile.objects.filter(email=email, user__is_active=True)
    return Response(profile.exists())


@api_view(['GET'])
def filter_profiles(request, query):
    all_profiles = Profile.objects.filter(user__is_active=True)

    profiles = [p for p in all_profiles if len(re.findall(f'^{query.lower()}', p.user.username))]

    for p in all_profiles.exclude(id__in=[p.id for p in profiles]):
        if query.lower() in p.user.username:
            profiles.append(p)

    serializer = Profile03Serializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def filter_profiles_by_interests(request):
    interests = request.data['interests']
    profiles = []
    for profile in Profile.objects.filter(interests__title=interests[0]).exclude(user=request.user):
        if all(inter in [i.title for i in profile.interests.filter(public=True)] for inter in interests) and profile not in profiles:
            profiles.append(profile)
    serializer = Profile03Serializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def my_profile_list_view(request, scroll_count):
    profile = Profile.objects.get(user=request.user)
    profiles = get_profile_list(profile)
    serializer = Profile03Serializer(profiles[:10 * scroll_count], many=True)
    return Response(serializer.data)


@api_view(['GET'])
def profile_list_view(request, slug):
    profile = Profile.objects.get(slug=slug)
    profiles = get_profile_list(profile)
    serializer = Profile03Serializer(profiles[:4], many=True)
    return Response(serializer.data)


@api_view(['GET'])
def interest_profile_list(request, interest):
    try:
        profiles = []
        interest = Interest.objects.get(title=interest.lower(), public=True)

        profiles_id = [p.id for p in profiles]
        for p in Profile.objects.filter(interests__id=interest.id).exclude(user=request.user).exclude(id__in=profiles_id):
            profiles.append(p)
        random.shuffle(profiles)
        serializer = Profile03Serializer(profiles[:30], many=True)
        return Response(serializer.data)
    except:
        return Response([])


@api_view(['GET'])
def my_profile(request):
    profile = Profile.objects.get(user=request.user)
    serializer = Profile04Serializer(profile)
    return Response(serializer.data)


@api_view(['GET'])
def get_weights(request):
    profile = Profile.objects.get(user=request.user)
    if profile.weights:
        serializer = WeightsSerializer(profile.weights)
        return Response(serializer.data)
    return Response({
        'profile': {
            'interest_weight': 50,
            'age_weight': 50,
            'friends_weight': 50,
            'is_friend_weight': 50
        },
        'post': {
            'date_weight': 50,
            'author_weight': 50,
            'likes_weight': 50,
        }
    })


@api_view(['POST'])
def set_weights(request):
    profile_data = request.data['profile']
    post_data = request.data['post']

    profile_weights, created = ProfileWeights.objects.get_or_create(
        interest_weight=profile_data['interest_weight'], age_weight=profile_data['age_weight'],
        friends_weight=profile_data['friends_weight'], is_friend_weight=profile_data['is_friend_weight']
    )
    post_weights, created = PostWeights.objects.get_or_create(
        date_weight=post_data['date_weight'], author_weight=post_data['author_weight'], likes_weight=post_data['likes_weight']
    )

    new_weights, created = Weights.objects.get_or_create(profile=profile_weights, post=post_weights)

    profile = Profile.objects.get(user=request.user)
    profile.weights = new_weights
    profile.save()
    return Response('weights updated')


@api_view(['GET'])
def friends_profiles(request, username):
    user = User.objects.get(username=username)
    friends = Invitation.objects.friends(user.profile)
    serializer = Profile03Serializer(friends, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def blocked_profiles(request):
    profile = Profile.objects.get(user=request.user)
    profiles = Block.objects.blocked_profiles(profile)
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def button_label(request, username):
    profile = Profile.objects.get(user=request.user)
    other_user = User.objects.get(username=username)

    if Invitation.objects.friends(profile).filter(user=other_user).exists():
        return Response('Amigos')
    if Invitation.objects.invitations_received(profile).filter(user=other_user).exists():
        return Response('Aceitar')
    if Invitation.objects.invitations_sent(profile).filter(user=other_user).exists():
        return Response('Solicitado')

    return Response('Solicitar')


@api_view(['GET'])
def myinvites(request):
    profile = Profile.objects.get(user=request.user)
    invites = Invitation.objects.invitations_received(profile)
    serializer = RelationshipDetailsSerializer([i.details for i in invites], many=True)
    return Response(serializer.data)


@api_view(['GET'])
def myinvites_number(request):
    profile = Profile.objects.get(user=request.user)
    invites = Invitation.objects.invitations_received(profile)
    return Response(len(invites))


@api_view(['POST'])
def remove_from_friends(request):
    profile = Profile.objects.get(user=request.user)
    other_profile = Profile.objects.get(id=request.data)
    try:
        relationship = Invitation.objects.get(Q(details__sender=profile) | Q(details__sender=other_profile), Q(details__receiver=profile) | Q(details__receiver=other_profile), status='accepted')
        relationship.delete()
        return Response('Removed from friends with success')
    except:
        return Response('Relationship doesn\'t exists')


@api_view(['POST'])
def send_friend_request(request):
    sender = Profile.objects.get(user=request.user)
    receiver = Profile.objects.get(id=request.data)
    if Invitation.objects.filters(Q(details__sender=sender) | Q(details__sender=receiver), Q(details__receiver=sender) | Q(details__receiver=receiver)).exists():
        return Response('Users already have a relationship')
    details = RelationshipDetails.objects.create(sender=sender, receiver=receiver)
    Invitation.objects.create(details=details, status='sent')
    return Response('Friend request sent')


@api_view(['POST'])
def cancel_friend_request(request):
    sender = Profile.objects.get(user=request.user)
    receiver = Profile.objects.get(id=request.data)
    try:
        Invitation.objects.get(details__sender=sender, details__receiver=receiver, status='sent').delete()
        return Response('Friend request canceled')
    except:
        return Response('Relationship doesn\'t exists')


@api_view(['POST'])
def reply_friend_request(request):
    profile = Profile.objects.get(user=request.user)
    sender = Profile.objects.get(id=request.data['senderid'])
    reply = request.data['reply']
    invitation = Invitation.objects.get(details__sender=sender, details__receiver=profile, status='sent')
    if reply == 'accept':
        invitation.status = 'accepted'
        invitation.save()
    elif reply == 'decline':
        invitation.delete()
    return Response('Replied with success')


@api_view(['POST'])
def block_profile(request):
    profile = Profile.objects.get(user=request.user)
    profile_to_block = Profile.objects.get(id=request.data)
    if profile != profile_to_block:
        RelationshipDetails.objects.filter(Q(sender=profile) | Q(sender=profile_to_block), Q(receiver=profile) | Q(receiver=profile_to_block)).delete()
        details = RelationshipDetails.objects.create(sender=profile, receiver=profile_to_block)
        Block.objects.create(details=details)
        return Response('Profile blocked')
    else:
        return Response('You can\'t block yourself')


@api_view(['POST'])
def unblock_profile(request):
    profile = Profile.objects.get(user=request.user)
    profile_to_unblock = Profile.objects.get(id=request.data)
    try:
        Block.objects.get(details__sender=profile, details__receiver=profile_to_unblock).delete()
        return Response('Profile unblocked')
    except:
        return Response('Relationship doesn\'t exists')


@api_view(['POST'])
def set_myinterests(request):
    profile = Profile.objects.get(user=request.user)
    profile.interests.clear()
    for title in request.data['public_interests']:
        if len(title) < 3:
            continue
        public_i, created = Interest.objects.get_or_create(title=title.lower(), public=True)
        profile.interests.add(public_i)

    for title in request.data['private_interests']:
        if len(title) < 3:
            continue
        private_i, created = Interest.objects.get_or_create(title=title.lower(), public=False)
        profile.interests.add(private_i)
    profile.save()
    
    return Response('Interests updated')
