release: python manage.py migrate
web: newrelic-admin run-program gunicorn napker.asgi:application --preload --max-requests 1200
worker: python manage.py runworker -v2