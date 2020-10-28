from django.urls import path

from .views import *

urlpatterns = [
    path('create-post', create_post),
]