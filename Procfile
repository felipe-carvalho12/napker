release: python manage.py migrate
web: gunicorn napker.asgi:application -b 0.0.0.0:$PORT -w 4 -k uvicorn.workers.UvicornH11Worker
chatworker: python manage.py runworker --settings==napker.settings -v2