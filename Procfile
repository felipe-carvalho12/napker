release: python manage.py migrate
web: newrelic-admin run-program daphne napker.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker -v2