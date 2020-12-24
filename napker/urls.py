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
from django.urls import path, include
from django.views.generic import TemplateView

from .views import *

urlpatterns = [
    # Main navigation
    path("", index_view, name="index"),
    path("home", index_view),
    path("notificações", index_view),
    path("mensagens", index_view),
    path("mensagens/<str:slug>", index_view),
    path("perfil", index_view),
    path("perfil/meus-interesses", index_view),
    path("configurações", index_view),
    path("configurações/segurança", index_view),
    path("configurações/perfis-bloqueados", index_view),
    path("configurações/alterar-senha", index_view),
    path("configurações/deletar-conta", index_view),
    path("configurações/faq", index_view),
    path("configurações/fale-conosco", index_view),
    path("user/<str:slug>", index_view),
    path("user/<str:slug>/amigos", index_view),
    path("post/<int:id>", index_view),
    path("post/<int:id>/comentar", index_view),
    path("postar", index_view),
    path("interesses/<str:query>", index_view),

    # Profile utils
    path("signup", signup_view, name="signup"),
    path("signup/interesses", add_interests_view, name="interests"),
    path("update-profile", update_profile),
    path("change-password", change_password),
    path("login", login_view, name="login"),
    path("logout", logout_view, name="logout"),
    path("delete-account", delete_account),

    path("activate/<uidb64>/<token>", activate_account_view, name="activate"),

    # APIs
    path("profile-api/", include("profiles.urls")),
    path("chat-api/", include("chat.urls")),
    path("post-api/", include("posts.urls")),
    path("settings-api/", include("settings.urls")),

    # Reset password
    path('recuperar-senha', reset_password, name="reset_password"),
    path('reset/<uidb64>/<token>', reset_password_confirm, name="reset"),
    path('reset-password-complete', reset_password_complete, name="password_reset_complete"),

    # Admin
    path("admin/", admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
