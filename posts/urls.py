from django.urls import path

from .views import *

urlpatterns = [
    path('post-list', post_list),
    path('post/<int:post_id>', get_post),
    path('unvisualized-post-likes', unvisualized_post_likes),
    path('visualize-likes', visualize_likes),
    path('unvisualized-post-comments', unvisualized_post_comments),
    path('visualize-comments', visualize_comments),
    path('create-post', create_post),
    path('delete-post/<int:post_id>', delete_post),
    path('comment-post/<int:post_id>', comment_post),
    path('delete-comment/<int:comment_id>', delete_comment),
    path('like-post/<int:post_id>', like_post),
    path('unlike-post/<int:post_id>', unlike_post),
    path('like-comment/<int:comment_id>', like_comment),
    path('unlike-comment/<int:comment_id>', unlike_comment),
]