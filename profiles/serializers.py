from django.contrib.auth.models import User
from rest_framework import serializers

from posts.models import *
from .models import *


class User01Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ['id', 'username']

class User02Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ['username']


# ----------------------------------------------------------------------


class Profile01Serializer(serializers.ModelSerializer):
    user = User01Serializer()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'posts', 'public_interests_length', 'blocked_users']

class Profile02Serializer(serializers.ModelSerializer):
    user = User02Serializer()

    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'photo']

class Profile03Serializer(serializers.ModelSerializer):
    user = User02Serializer()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'photo', 'bio']

class Profile04Serializer(serializers.ModelSerializer):
    user = User02Serializer()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'photo', 'bio', 'created', 'posts', 'interests']


# ----------------------------------------------------------------------


class ProfileWeightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileWeights
        fields = '__all__'

class PostWeightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostWeights
        fields = '__all__'

class WeightsSerializer(serializers.ModelSerializer):
    profile = ProfileWeightsSerializer()
    post = PostWeightsSerializer()

    class Meta:
        model = Weights
        fields = '__all__'


# ----------------------------------------------------------------------

class RelationshipDetailsSerializer(serializers.ModelSerializer):
    sender = Profile03Serializer()

    class Meta:
        model = RelationshipDetails
        fields = ['sender']

