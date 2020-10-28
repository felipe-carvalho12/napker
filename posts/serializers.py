from rest_framework import serializers

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

class PostSerializer(serializers.ModelSerializer):
    likes = UserSerializer(many=True)
    author = UserSerializer()
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    post = PostSerializer()
    class Meta:
        model = Comment
        fields = '__all__'