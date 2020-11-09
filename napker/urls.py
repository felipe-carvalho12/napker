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
    path('', index_view, name='index'),
    path('home', pages_view),
    path('notificações', pages_view),
    path('mensagens', pages_view),
    path('mensagens/<str:slug>', pages_view),
    path('perfil', pages_view),
    path('configurações', pages_view),
    path('configurações/bloquear-usuário', pages_view),
    path('configurações/alterar-senha', pages_view),
    path('configurações/deletar-conta', pages_view),
    path('user/<str:slug>', pages_view),
    path('user/<str:slug>/amigos', pages_view),
    path('post/<int:id>', pages_view),
    path('post/<int:id>/comment', pages_view), 
    path('interesse/<str:interest>', pages_view),

    path('signup', signup_view, name='signup'),
    path('interesses', add_interests_view, name='interests'),
    path('update-profile', update_profile),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),

    path('profile-api/', include('profiles.urls')),
    path('chat-api/', include('chat.urls')),
    path('post-api/', include('posts.urls')),

    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
