release: python manage.py migrate
web: gunicorn --port $PORT --bind 0.0.0.0 -v2 napker.asgi:application
chatworker: python manage.py runworker --settings==napker.settings -v2