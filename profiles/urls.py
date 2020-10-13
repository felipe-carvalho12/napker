from django.urls import path

from .views import *

urlpatterns = [
    path('profile-list', profile_list)
]