from django.db.models.signals import post_save, post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver

from chat.models import Contact
from .models import Profile

@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        Contact.objects.create(user=instance)
