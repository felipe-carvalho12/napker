from django.urls import path

from .views import *

urlpatterns = [
    path('post-list/<int:scroll_count>', post_list_view),
    path('post/<int:post_id>', get_post),
    path('likes/<int:publication_id>', get_likes),
    path('interest-post-list/<str:interest>', interest_post_list),
    path('explore-post-list', explore_post_list),
    path('mention-notifications-number', mention_notifications_number),
    path('post-mention-notifications', post_mention_notifications),
    path('comment-mention-notifications', comment_mention_notifications),
    path('visualize-mentions', visualize_mentions),
    path('publication-notifications-number', publication_notification_number),
    path('post-notifications', post_notifications),
    path('comment-notifications', comment_notifications),
    path('visualize-likes', visualize_likes),
    path('visualize-comments', visualize_comments),
    path('create-post', create_post),
    path('create-comment', create_comment),
    path('delete-publication/<int:publication_id>', delete_publication),
    path('like-publication/<int:publication_id>', like_publication),
    path('unlike-publication/<int:publication_id>', unlike_publication),
    path('get-mentions', get_mentions),
]