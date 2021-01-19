release: python manage.py migrate
web: gunicorn napker.wsgi --log-file -
web2: gunicorn napker.asgi:application -b 0.0.0.0:$PORT -w 1 -k uvicorn.workers.UvicornWorker