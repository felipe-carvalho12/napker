from django.contrib.auth.models import User
from rest_framework import serializers

from posts.models import *
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

# UNRELATED SERIALIZERS - AVOID CIRCULAR RELATIONSHIP ISSUE
class PostLikeUnrelatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = '__all__'

class CommentLikeUnrelatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = '__all__'

class CommentUnrelatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostUnrelatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class ProfileUnrelatedSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = '__all__'
#------------------------------------------


# POSTS APP SERIALIZERS
class PostLikeSerializer(PostLikeUnrelatedSerializer):
    profile = ProfileUnrelatedSerializer()
    post = PostUnrelatedSerializer()

class CommentLikeSerializer(CommentLikeUnrelatedSerializer):
    profile = ProfileUnrelatedSerializer()
    comment = CommentUnrelatedSerializer()

class CommentSerializer(CommentUnrelatedSerializer):
    likes = CommentLikeSerializer(source='all_likes', many=True)
    author = ProfileUnrelatedSerializer()
    post = PostUnrelatedSerializer()

class PostSerializer(PostUnrelatedSerializer):
    likes = PostLikeSerializer(source='all_likes', many=True)
    comments = CommentSerializer(source='all_comments', many=True)
    author = ProfileUnrelatedSerializer()

# PROFILES APP SERIALIZERS
class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'

class ProfileSerializer(ProfileUnrelatedSerializer):
    interests = InterestSerializer(many=True)
    friends = UserSerializer(many=True)
    posts = PostSerializer(source='get_all_posts', many=True)

class RelationshipSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer()
    receiver = ProfileSerializer()
    class Meta:
        model = Relationship
        fields = '__all__'
