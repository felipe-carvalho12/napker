release: python manage.py migrate
web: gunicorn napker.asgi:application -w 4 -k uvicorn.workers.UvicornWorker
worker: python manage.py runworker -v2
