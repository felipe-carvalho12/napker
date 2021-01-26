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
    author = Profile01Serializer

    class Meta:
        model = Like
        fields = ['author', 'created']


class PublicationDetails01Serializer(serializers.ModelSerializer):
    author = Profile01Serializer()

    class Meta:
        model = PublicationDetails
        fields = ['id', 'author', 'created', 'comments_length', 'likes_profile_id']


class CommentSerializer(serializers.ModelSerializer):
    details = PublicationDetails01Serializer()

    class Meta:
        model = PublicationDetails
        fields = ['author', 'comments']

    
class PublicationDetails02Serializer(serializers.ModelSerializer):
    author = Profile01Serializer
    comments = RecursiveField(many=True)

    class Meta:
        model = PublicationDetails
        fields = ['author', 'comments']

class PublicationDetails03Serializer(serializers.ModelSerializer):
    author = Profile01Serializer
    likes = LikeSerializer(many=True)
    comments = PublicationDetails02Serializer(many=True)

    class Meta:
        model = PublicationDetails
        fields = ['author', 'likes', 'comments']

class PublicationDetails04Serializer(serializers.ModelSerializer):
    author = Profile01Serializer()
    first_layer_comments = PublicationDetails02Serializer(many=True)

    class Meta:
        model = PublicationDetails
        fields = ['author', 'created', 'comments_length', 'likes_profile_id', 'first_layer_comments']


class Post01Serializer(serializers.ModelSerializer):
    details = PublicationDetails01Serializer()

    class Meta:
        model = Post
        fields = ['details', 'content', 'video', 'image']

class Post02Serializer(serializers.ModelSerializer):
    details = PublicationDetails04Serializer()

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
    user = User01Serializer()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'posts', 'public_interests_length', 'blocked_users']

class Profile04Serializer(serializers.ModelSerializer):
    user = User02Serializer()
    posts = Post01Serializer(many=True)
    interests = InterestSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'photo', 'bio', 'posts', 'interests', 'friends_length', 'created']

class Profile05Serializer(serializers.ModelSerializer): # mentions
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


class NotificationSerializer(serializers.ModelSerializer):
    details = PublicationDetails01Serializer()

    class Meta:
        model = Notification
        fields = '__all__'