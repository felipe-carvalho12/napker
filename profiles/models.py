from django.contrib.auth.models import User
from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.
class Interest(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, unique=True, blank=True, null=True)
    photo = models.ImageField(default='avatar.png', upload_to='')
    bio = models.TextField(default='Sem bio...', max_length=240)
    slug = models.SlugField(unique=True, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    friends = models.ManyToManyField(User, blank=True, related_name='friends')
    interests = models.ManyToManyField(Interest, related_name='profiles')
    
    def get_friends(self):
        return self.friends.all()

    def get_friends_number(self):
        return self.friends.all().count()

    def __str__(self):
        return f'{self.user.username}'

    def save(self, *args, **kwargs):
        self.slug = slugify(self.user.username)
        super().save(*args, **kwargs)


class Relationship(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=8, choices=(('send', 'send'), ('accepted', 'accepted')))

    def __str__(self):
        return f'{self.sender} - {self.receiver} - {self.status}'
