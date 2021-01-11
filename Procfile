release: python manage.py migrate
web: gunicorn -b ['0.0.0.0:$PORT'] napker.asgi:application
chatworker: python manage.py runworker --settings==napker.settings -v2