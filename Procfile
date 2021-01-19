release: python manage.py migrate
web: gunicorn -k uvicorn.workers.UvicornWorker napker.asgi:application
worker: python manage.py runworker -v2
