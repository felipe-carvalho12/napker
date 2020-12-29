from django.contrib.auth.models import User
from rest_framework import serializers

from posts.models import *
from .models import *

class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

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

class PostUnrelatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class ProfileUnrelatedSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = '__all__'


class CommentUnrelatedSerializer(serializers.ModelSerializer):
    author = ProfileUnrelatedSerializer()
    post = PostUnrelatedSerializer()
    likes = CommentLikeUnrelatedSerializer(many=True)

    class Meta:
        model = Comment
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
    comments = RecursiveField(source='child_comments', many=True)
    all_child_comments_length = serializers.IntegerField()


class PostSerializer(PostUnrelatedSerializer):
    likes = PostLikeSerializer(source='all_likes', many=True)
    all_child_comments_length = serializers.IntegerField()
    first_layer_comments = CommentSerializer(many=True)
    author = ProfileUnrelatedSerializer()

# PROFILES APP SERIALIZERS
class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'

class PostWeightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostWeights
        fields = '__all__'

class ProfileSerializer(ProfileUnrelatedSerializer):
    interests = InterestSerializer(many=True)
    friends = UserSerializer(many=True)
    blocked_users = UserSerializer(many=True)
    posts = PostSerializer(source='get_all_posts', many=True)
    post_weights = PostWeightsSerializer()

class RelationshipSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer()
    receiver = ProfileSerializer()
    class Meta:
        model = Relationship
        fields = '__all__'
