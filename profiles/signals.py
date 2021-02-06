from django.db.models.signals import post_save, post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver

from chat.models import Contact
from .models import Profile, InterestSet

@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance)
        interest_set = InterestSet.objects.create()
        profile.interest_set = interest_set
        profile.save()
        
        Contact.objects.create(user=instance)
