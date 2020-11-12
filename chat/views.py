import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404

from profiles.serializers import Profile, ProfileSerializer
from .models import Chat, Contact
from .serializers import ChatSerializer


def get_last_50_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:50]


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=int(chatId))


@api_view(['GET'])
def get_chat_id(request, participants):
    data = json.loads(participants)
    username = data['username']
    other_username = data['other_username']
    user = User.objects.get(username=username)
    other_user = User.objects.get(username=other_username)
    contact, created = Contact.objects.get_or_create(user=user)
    other_contact, created = Contact.objects.get_or_create(user=other_user)
    chat = Chat.objects.filter(participants__id=contact.id)
    if chat.exists():
        chat = chat.filter(participants__id=other_contact.id)
        if chat.exists():
            chat = chat.first()
        else:
            chat = Chat.objects.create()
            chat.participants.add(contact)
            chat.participants.add(other_contact)
    else:
        chat = Chat.objects.create()
        chat.participants.add(contact)
        chat.participants.add(other_contact)
    return Response({'chat_id': chat.id})


@api_view(['GET'])
def get_active_chats_profiles(request):
    contact = Contact.objects.get(user=request.user)
    chats = [chat for chat in Chat.objects.filter(participants__id=contact.id) if chat.messages.all().exists()]
    ordered_chats = sorted(chats, key=lambda chat: chat.messages.last().timestamp)
    profiles = []
    for chat in ordered_chats:
        for participant in chat.participants.exclude(user=contact.user):
            profiles.append(Profile.objects.get(user=participant.user))
    profiles_serializer = ProfileSerializer(profiles, many=True)
    chats_serializer = ChatSerializer(ordered_chats, many=True)
    return Response({
        'profiles': profiles_serializer.data,
        'chats': chats_serializer.data
    })


@api_view(['GET'])
def get_all_unread_messages_number(request):
    contact = Contact.objects.get(user=request.user)
    unread_messages_counter = 0
    chats = [chat for chat in Chat.objects.filter(participants__id=contact.id) if chat.messages.all().exists()]
    for chat in chats:
        unread_messages_counter += len(chat.messages.filter(read=False).exclude(contact=contact))
    return Response({'unread_messages_number': unread_messages_counter})


@api_view(['GET'])
def get_chat_unread_messages_number(request, chat_id):
    contact = Contact.objects.get(user=request.user)
    unread_messages_counter = 0
    chat = get_current_chat(chat_id)
    unread_messages_counter += len(chat.messages.filter(contact=contact, read=False))
    return Response({'unread_messages_number': unread_messages_counter})


@api_view(['POST'])
def read_unread_messages(request):
    contact = Contact.objects.get(user=request.user)
    chat_id = request.data['chat_id']
    messages = get_current_chat(chat_id).messages.filter(read=False).exclude(contact=contact)
    for message in messages:
        message.read = True
        message.save()
    return Response('messages marked as read')
