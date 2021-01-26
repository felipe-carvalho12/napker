from django.urls import path

from .views import *

urlpatterns = [
    path('post-list/<int:scroll_count>', post_list_view),
    path('post/<int:post_id>', get_post),
    path('likes/<int:publication_id>', get_likes),
    path('interest-post-list/<str:interest>', interest_post_list),
    path('explore-post-list', explore_post_list),
    path('post-notifications', publication_notifications),
    path('visualize-likes', visualize_likes),
    path('visualize-comments', visualize_comments),
    path('create-post', create_post),
    path('create-comment', create_comment),
    path('delete-publication/<int:post_id>', delete_publication),
    path('like-publication/<int:publication_id>', like_publication),
    path('unlike-publication/<int:publication_id>', unlike_publication),
    path('get-mentions', get_mentions),
]