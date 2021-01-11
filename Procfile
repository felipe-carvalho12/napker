release: python manage.py migrate
web: uvicorn napker.asgi:application --host=0.0.0.0 --port=${PORT:-5000}
chatworker: python manage.py runworker --settings==napker.settings -v2