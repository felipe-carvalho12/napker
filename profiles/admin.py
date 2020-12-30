from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Profile)
admin.site.register(Interest)
admin.site.register(ProfileWeights)
admin.site.register(PostWeights)
admin.site.register(Weights)
admin.site.register(Relationship)
