"""
ASGI config for napker project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os
import django
from channels.routing import get_default_application
import newrelic.agent
import django.core.handlers.base as handlers

newrelic.agent.initialize()
newrelic.agent.wrap_web_transaction(handlers, 'BaseHandler.get_response')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'napker.settings')
django.setup()
application = get_default_application()
