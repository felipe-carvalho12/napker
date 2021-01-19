release: python manage.py migrate
web: gunicorn napker.asgi:application -k uvicorn.workers.UvicornWorker
worker: python manage.py runworker --only-channels=websocket.* -v2
