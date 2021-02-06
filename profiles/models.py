from django.contrib.auth.models import User
from django.db import models
from django.db.models import Q

# Create your models here.

class Interest(models.Model):
    title = models.CharField(max_length=50)
    public = models.BooleanField(default=False)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class InterestWeight(models.Model):
    value = models.FloatField()
    interest = models.OneToOneField(Interest, on_delete=models.CASCADE, related_name='weight')


class InterestSet(models.Model):
    interests = models.ManyToManyField(Interest, related_name='interest_set')
    
    def __str__(self): 
        return ', '.join([interest.title for interest in self.interests.all()])


# ----------------------------------------------------------------------


class RelationshipDetails(models.Model):
    sender = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='receiver')

    def __str__(self):
        return f'{self.sender} - {self.receiver} - {self.content}'


class InvitationManager(models.Manager):
    def invitations_received(self, receiver):
        invites = Invitation.objects.filter(details__receiver=receiver, status='sent')
        return invites

    def invitations_sent(self, sender):
        invites = Invitation.objects.filter(details__sender=sender, status='sent')
        return invites

    def friends(self, profile):
        invites = Invitation.objects.filter(Q(details__sender=profile) | Q(details__receiver=profile), status='accepted')
        friends = [i.details.receiver if i.details.sender == profile else i.details.sender for i in invites]
        return friends

class Invitation(models.Model):
    details = models.OneToOneField(RelationshipDetails, related_name='invitation', on_delete=models.CASCADE)
    status = models.CharField(max_length=8, choices=(('sent', 'sent'), ('accepted', 'accepted')), default='sent')

    objects = InvitationManager()

    def __str__(self):
        return f'invitation-{self.status}'


class BlockManager(models.Manager):
    def blocked_profiles(self, profile):
        blocks = Block.objects.filter(details__sender=profile)
        profiles = [block.details.receiver for block in blocks]
        return profiles

class Block(models.Model):
    details = models.OneToOneField(RelationshipDetails, related_name='block', on_delete=models.CASCADE)

    objects = BlockManager()

    def __str__(self):
        return f'block'


# ----------------------------------------------------------------------

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


# ----------------------------------------------------------------------


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    photo = models.ImageField(default='profile_avatar.jpeg', upload_to='profile/')
    bio = models.TextField(default='Sem bio...', max_length=100)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    interest_set = models.ForeignKey(InterestSet, related_name='profiles', on_delete=models.SET_NULL, blank=True, null=True, default=None)
    weights = models.ForeignKey(Weights, on_delete=models.SET_NULL, related_name='profiles', blank=True, null=True)

    def __str__(self):
        return f'{self.user.username}'

    @property
    def username(self):
        return self.user.username

    @property
    def posts(self):
        posts = []

        for pub in self.publications.all():
            try: posts.append(pub.post)
            except: pass

        return posts

    @property
    def interests(self):
        return self.interest_set.interests.all() if self.interest_set is not None else []

    @property
    def public_interests_length(self):
        return self.interest_set.interests.filter(public=True).count()

    @property
    def friends_length(self):
        return len(Invitation.objects.friends(self))

    @property
    def blocked_profiles(self):
        return Block.objects.blocked_profiles(self)

    @property
    def blocked_profiles_id(self):
        return [profile.id for profile in Block.objects.blocked_profiles(self)]
