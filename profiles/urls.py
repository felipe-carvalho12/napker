from django.urls import path

from .views import *

urlpatterns = [
    path('logged-user', get_logged_user),
    path('user/<str:username>', get_profile),
    path('users/<str:query>', filter_profiles),
    path('profile-list', profile_list),
    path('myprofile', my_profile),
    path('myinvites', invites_received_view),
    path('pending-sent-friend-requests', pending_sent_friend_requests),
    path('send-friend-request', send_friends_request),
    path('cancel-friend-request', cancel_friend_request),
    path('reply-friend-request', reply_friend_request),
]