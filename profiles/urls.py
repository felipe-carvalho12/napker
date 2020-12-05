from django.urls import path

from .views import *

urlpatterns = [
    path('logged-user', get_logged_user),
    path('user/<str:slug>', get_profile),
    path('profile-by-email/<str:email>', get_profile_by_email),
    path('users/<str:query>', filter_profiles),
    path('profile-list', profile_list_view),
    path('interest-profile-list/<str:interest>', interest_profile_list),
    path('myprofile', my_profile),
    path('get-friends-profiles/<str:slug>', friends_profiles),
    path('get-blocked-profiles', blocked_profiles),
    path('relationship/<str:slug>', get_relationship),
    path('myinvites', friend_requests_received),
    path('pending-sent-friend-requests', pending_sent_friend_requests),
    path('remove-from-friends', remove_from_friends),
    path('send-friend-request', send_friends_request),
    path('cancel-friend-request', cancel_friend_request),
    path('reply-friend-request', reply_friend_request),
    path('block-user', block_profile),
    path('unblock-user', unblock_profile),
    path('set-myinterests', set_myinterests),
]
