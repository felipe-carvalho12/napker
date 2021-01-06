from django.urls import path

from .views import *

urlpatterns = [
    path('post-list/<int:scroll_count>', post_list_view),
    path('post/<int:post_id>', get_post),
    path('interest-post-list/<str:interest>', interest_post_list),
    path('explore-post-list', explore_post_list),
    path('post-notifications', post_notifications),
    path('visualize-likes', visualize_likes),
    path('visualize-comments', visualize_comments),
    path('create-post', create_post),
    path('delete-post/<int:post_id>', delete_post),
    path('create-comment', create_comment),
    path('delete-comment/<int:comment_id>', delete_comment),
    path('like-post/<int:post_id>', like_post),
    path('unlike-post/<int:post_id>', unlike_post),
    path('like-comment/<int:comment_id>', like_comment),
    path('unlike-comment/<int:comment_id>', unlike_comment),
]