from django.urls import path

from .views import *

urlpatterns = [
    path('active-chats-profiles', get_active_chats_profiles),
    path('chat-id/<str:username>', get_chat_id),
    path('all-unread-messages-number', get_all_unread_messages_number),
    path('unread-messages-number/<str:chat_id>', get_chat_unread_messages_number),
    path('read-messages', read_unread_messages),
]
