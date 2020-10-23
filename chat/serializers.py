from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Contact, Message, Chat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ContactSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Contact
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)
    messages = MessageSerializer(many=True)
    class Meta:
        model = Chat
        fields = '__all__'
