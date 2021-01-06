from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Post)
admin.site.register(Hashtag)
admin.site.register(Comment)
admin.site.register(CommentRelationship)
admin.site.register(PostLike)
admin.site.register(CommentLike)
admin.site.register(Notification)