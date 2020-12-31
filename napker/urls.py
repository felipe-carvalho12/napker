"""napker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

from .views import *

urlpatterns = [
    # Profile utils
    path("post-login", login_view),
    path("logout", logout_view, name="logout"),
    path("post-signup", signup_view),
    path("post-signup/interests", add_interests_view),
    path("activate/<uidb64>/<token>", activate_account_view, name="activate"),
    path("update-profile", update_profile),
    path('post-reset-password', reset_password),
    path('reset/<uidb64>/<token>', reset_password_confirm, name="reset"),
    path('reset-password-complete', reset_password_complete, name="password_reset_complete"),
    path("change-password", change_password),
    path("delete-account", delete_account),

    # APIs
    path("profile-api/", include("profiles.urls")),
    path("chat-api/", include("chat.urls")),
    path("post-api/", include("posts.urls")),
    path("settings-api/", include("settings.urls")),

    # Admin
    path("admin/", admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


urlpatterns += [re_path('.*', TemplateView.as_view(template_name="index.html"))]
