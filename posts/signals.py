from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import *

@receiver(post_save, sender=Post)
def post_save_create_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(post=instance)
