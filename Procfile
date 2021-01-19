release: python manage.py migrate
web: gunicorn napker.asgi:application -w 2 -k uvicorn.workers.UvicornWorker
