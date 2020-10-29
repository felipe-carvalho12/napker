from django.contrib.auth.models import User
from rest_framework import serializers

from posts.models import *
from .models import *

# UNRELATED SERIALIZERS - AVOID CIRCULAR RELATIONSHIP ISSUE
class CommentUnrelatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostUnrelatedSerializer(serializers.ModelSerializer):
    comments = CommentUnrelatedSerializer(source='all_comments', many=True)
    class Meta:
        model = Post
        fields = '__all__'
#------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    interests = InterestSerializer(many=True)
    friends = UserSerializer(many=True)
    posts = PostUnrelatedSerializer(source='get_all_posts', many=True)
    class Meta:
        model = Profile
        fields = '__all__'

class RelationshipSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer()
    receiver = ProfileSerializer()
    class Meta:
        model = Relationship
        fields = '__all__'


# POSTS APP SERIALIZERS
class PostSerializer(PostUnrelatedSerializer):
    likes = ProfileSerializer(many=True)
    author = ProfileSerializer()

class CommentSerializer(CommentUnrelatedSerializer):
    author = ProfileSerializer()
    post = PostSerializer()
