from django.contrib.auth.models import User
from rest_framework import serializers

from posts.models import *
from .models import *


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


# ----------------------------------------------------------------------
# --Profiles------------------------------------------------------------
# ----------------------------------------------------------------------


class User01Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class User02Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


# ---------------------------------------------------------------------

class Profile01Serializer(serializers.ModelSerializer):
    user = User02Serializer()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'photo', 'bio']

class Profile02Serializer(serializers.ModelSerializer):
    user = User02Serializer()

    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'photo']

# ----------------------------------------------------------------------
# --Posts---------------------------------------------------------------
# ----------------------------------------------------------------------


class LikeSerializer(serializers.ModelSerializer):
    profile = Profile01Serializer()

    class Meta:
        model = Like
        fields = ['profile', 'created']


class PublicationDetails01Serializer(serializers.ModelSerializer):
    author = Profile01Serializer()

    class Meta:
        model = PublicationDetails
        fields = ['id', 'author', 'created', 'all_comments_length', 'likes_profile_id']
    
class PublicationDetails02Serializer(serializers.ModelSerializer):
    author = Profile01Serializer()

    class Meta:
        model = PublicationDetails
        fields = ['id', 'author', 'layer', 'created', 'first_layer_comments_length', 'likes_profile_id']


class Comment01Serializer(serializers.ModelSerializer):
    details = PublicationDetails02Serializer()
    first_layer_comments = RecursiveField(many=True)

    class Meta:
        model = Comment
        fields = ['details', 'content', 'first_layer_comments']


class PublicationDetails03Serializer(serializers.ModelSerializer):
    author = Profile01Serializer()
    likes = LikeSerializer(many=True)
    comments = Comment01Serializer(source='all_comments', many=True)

    class Meta:
        model = PublicationDetails
        fields = ['author', 'likes', 'comments', 'created']


class PublicationDetails04Serializer(serializers.ModelSerializer):
    author = Profile01Serializer()
    first_layer_comments = Comment01Serializer(many=True)

    class Meta:
        model = PublicationDetails
        fields = ['id', 'author', 'created', 'all_comments_length', 'likes_profile_id', 'first_layer_comments']


class PublicationDetails05Serializer(serializers.ModelSerializer):
    author = Profile01Serializer()
    likes = LikeSerializer(many=True)

    class Meta:
        model = PublicationDetails
        fields = ['author', 'likes', 'layer', 'created']


class Comment02Serializer(serializers.ModelSerializer):
    details = PublicationDetails05Serializer()
    comments = RecursiveField(source='first_layer_comments', many=True)

    class Meta:
        model = Comment
        fields = ['details', 'content', 'comments']


class Post01Serializer(serializers.ModelSerializer):
    details = PublicationDetails01Serializer()

    class Meta:
        model = Post
        fields = ['id', 'details', 'content', 'video', 'image']

class Post02Serializer(serializers.ModelSerializer):
    details = PublicationDetails04Serializer()

    class Meta:
        model = Post
        fields = ['id', 'details', 'content', 'video', 'image']

class Post03Serializer(serializers.ModelSerializer):
    details = PublicationDetails03Serializer()

    class Meta:
        model = Post
        fields = ['id', 'details', 'content', 'video', 'image']


# ----------------------------------------------------------------------
# --Profiles------------------------------------------------------------
# ----------------------------------------------------------------------


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'


class Profile03Serializer(serializers.ModelSerializer):
    user = User02Serializer()
    posts = Post01Serializer(many=True)
    interests = InterestSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'photo', 'bio', 'posts', 'interests', 'friends_length', 'blocked_profiles_id', 'created']


class Profile04Serializer(serializers.ModelSerializer): # mentions
    name = serializers.CharField(source='username')
    avatar = serializers.ImageField(source='photo')

    class Meta:
        model = Profile
        fields = ['name', 'avatar']


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


# ----------------------------------------------------------------------
# --Posts---------------------------------------------------------------
# ----------------------------------------------------------------------


class NotificationDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationDetails
        fields = '__all__'

class PostNotificationsSerializer(serializers.ModelSerializer):
    details = NotificationDetailsSerializer()
    post = Post03Serializer()

    class Meta:
        model = PostNotification
        fields = '__all__'

class CommentNotificationsSerializer(serializers.ModelSerializer):
    details = NotificationDetailsSerializer()
    comment = Comment02Serializer()

    class Meta:
        model = CommentNotification
        fields = '__all__'