from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(PublicationDetails)
admin.site.register(Post)
admin.site.register(Hashtag)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(NotificationDetails)
admin.site.register(PostNotification)
admin.site.register(CommentNotification)
admin.site.register(Mention)
