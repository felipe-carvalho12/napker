from django.urls import path

from .views import *

urlpatterns = [
    path('post-list', post_list),
    path('create-post', create_post),
    path('like-post/<int:post_id>', like_post),
    path('unlike-post/<int:post_id>', unlike_post),
]