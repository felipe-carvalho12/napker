import json
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Chat, Contact


def get_last_50_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:50]


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)

def get_chat_id(request, participants):
    data = json.loads(participants)
    username = data['username']
    other_username = data['other_username']
    user = User.objects.get(username=username)
    other_user = User.objects.get(username=other_username)
    contact = Contact.objects.get(user=user)
    other_contact = Contact.objects.get(user=other_user)
    chat = Chat.objects.filter(participants=[contact, other_contact])
    return JsonResponse({'chat_id': chat.id})