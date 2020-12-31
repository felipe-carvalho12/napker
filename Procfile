release: python manage.py migrate
web: daphne napker.asgi:application --port $PORT --bind 0.0.0.0 -v2
chatworker: python manage.py runworker --settings==napker.settings -v2