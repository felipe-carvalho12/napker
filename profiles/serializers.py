from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Interest, Profile, Relationship


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    interests = InterestSerializer(many=True)
    friends = UserSerializer(many=True)
    class Meta:
        model = Profile
        fields = '__all__'

class RelationshipSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer()
    receiver = ProfileSerializer()
    class Meta:
        model = Relationship
        fields = '__all__'
