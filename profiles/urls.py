from django.urls import path

from .views import *

urlpatterns = [
    path('user/<str:username>', get_profile),
    path('users/<str:query>', filter_profiles),
    path('profile-list', profile_list),
    path('myprofile', my_profile),
    path('myinvites', invites_received_view),
    path('pending-sent-friend-requests', pending_sent_friend_requests),
    path('reply-friend-request', reply_friend_request),
]