from django.urls import path

from .views import *

urlpatterns = [
    path('user/<str:username>', get_profile),
    path('users/<str:query>', get_profiles),
    path('profile-list', profile_list),
    path('myprofile', my_profile),
    path('myinvites', invites_received_view),
    path('reply-friend-request', reply_friend_request)
]