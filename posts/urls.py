from django.urls import path

from .views import *

urlpatterns = [
    path('post-list', post_list),
    path('post/<int:post_id>', get_post),
    path('unvisualized-likes', unvisualized_likes),
    path('visualize-likes', visualize_likes),
    path('create-post', create_post),
    path('like-post/<int:post_id>', like_post),
    path('unlike-post/<int:post_id>', unlike_post),
    path('like-comment/<int:comment_id>', like_comment),
    path('unlike-comment/<int:comment_id>', unlike_comment),
]