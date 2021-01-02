from django.contrib.auth.models import User
from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.


class Interest(models.Model):
    title = models.CharField(max_length=50)
    public = models.BooleanField(default=False)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class ProfileWeights(models.Model):
    interest_weight = models.FloatField()
    age_weight = models.FloatField()
    friends_weight = models.FloatField()
    is_friend_weight = models.FloatField()

    def __str__(self):
        return f'INTEREST: {self.interest_weight}, AGE: {self.age_weight}, FRIENDS: {self.friends_weight}, IS_FRIEND: {self.is_friend_weight}'


class PostWeights(models.Model):
    date_weight = models.FloatField()
    author_weight = models.FloatField()
    likes_weight = models.FloatField()

    def __str__(self):
        return f'DATE: {self.date_weight}, AUTHOR: {self.author_weight}, LIKES: {self.likes_weight}'


class Weights(models.Model):
    profile = models.ForeignKey(ProfileWeights, on_delete=models.CASCADE)
    post = models.ForeignKey(PostWeights, on_delete=models.CASCADE)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    photo = models.ImageField(default='profile_avatar.jpeg', upload_to='profile/')
    bio = models.TextField(default='Sem bio...', max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    friends = models.ManyToManyField(User, blank=True, related_name='friends')
    blocked_users = models.ManyToManyField(User, blank=True, related_name='blocked_me')
    interests = models.ManyToManyField(Interest, related_name='profiles')
    weights = models.ForeignKey(Weights, on_delete=models.SET_NULL, related_name='profiles', default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.user.username}'

    def get_friends_number(self):
        return self.friends.all().count()

    def get_posts_number(self):
        return self.posts.all().count()

    def get_all_posts(self):
        return self.posts.all()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.user.username)
        super().save(*args, **kwargs)


class RelationshipManager(models.Manager):
    def invitations_received(self, receiver):
        invites = Relationship.objects.filter(receiver=receiver, status='sent')
        return invites

    def invitations_sent(self, sender):
        invites = Relationship.objects.filter(sender=sender, status='sent')
        return invites


class Relationship(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=8, choices=(('sent', 'sent'), ('accepted', 'accepted')), default='sent')

    objects = RelationshipManager()

    def __str__(self):
        return f'{self.sender} - {self.receiver} - {self.status}'
