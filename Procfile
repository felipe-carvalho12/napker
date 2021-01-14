release: python manage.py migrate
web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker napker.asgi:application
chatworker: python manage.py runworker --settings==napker.settings -v2