from django.urls import path

from .views import get_chat_id, get_active_chats_profiles

urlpatterns = [
    path('active-chats-profiles', get_active_chats_profiles),
    path('chat-id/<str:participants>', get_chat_id)
]