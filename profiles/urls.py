from django.urls import path

from .views import *

urlpatterns = [
    path('is-logged', is_logged),
    path('myusername', my_username),
    path('profile01/<str:username>', get_profile01),
    path('profile02/<str:username>', get_profile02),
    path('username-is-taken/<str:username>', username_is_taken),
    path('email-is-taken/<str:email>', email_is_taken),
    path('profiles/<str:query>', filter_profiles),
    path('profiles-by-interest', filter_profiles_by_interests),
    path('my-profile-list/<int:scroll_count>', my_profile_list_view),
    path('profile-list/<str:slug>', profile_list_view),
    path('interest-profile-list/<str:interest>', interest_profile_list),
    path('myprofile', my_profile),
    path('get-weights', get_weights),
    path('set-weights', set_weights),
    path('friends-profiles/<str:slug>', friends_profiles),
    path('blocked-profiles', blocked_profiles),
    path('button-label/<str:username>', button_label),
    path('myinvites', myinvites),
    path('myinvites-number', myinvites_number),
    path('remove-from-friends', remove_from_friends),
    path('send-friend-request', send_friend_request),
    path('cancel-friend-request', cancel_friend_request),
    path('reply-friend-request', reply_friend_request),
    path('block-user', block_profile),
    path('unblock-user', unblock_profile),
    path('set-myinterests', set_myinterests),
]
