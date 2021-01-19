release: python manage.py migrate
web: gunicorn napker.asgi:application -k uvicorn.workers.UvicornWorker