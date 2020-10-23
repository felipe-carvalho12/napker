from django.urls import path

from .views import get_chat_id

urlpatterns = [
    path('chat-id/<str:participants>', get_chat_id)
]