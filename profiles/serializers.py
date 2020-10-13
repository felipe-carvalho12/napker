from .models import Profile
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'email', 'photo', 'bio',
        'slug', 'created', 'updated', 'friends', 'interests']
