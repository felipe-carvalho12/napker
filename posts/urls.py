from django.urls import path

from .views import *

urlpatterns = [
    path('post-list', post_list),
    path('create-post', create_post),
]