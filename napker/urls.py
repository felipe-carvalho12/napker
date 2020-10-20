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
    path('', home_view, name='index'),
    path('home', home_view),
    path('notificações', home_view),
    path('mensagens', home_view),
    path('perfil', home_view),
    path('configurações', home_view),
    path('signup', signup_view, name='signup'),
    path('interests', add_interests_view, name='interests'),
    path('update-profile', update_profile),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
    path('admin/', admin.site.urls),
    path('profile-api/', include('profiles.urls')),

    path('chat', include('chat.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
