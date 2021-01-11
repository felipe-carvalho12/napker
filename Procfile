release: python manage.py migrate
web: uvicorn src.main:app --host=0.0.0.0 --port=$PORT
chatworker: python manage.py runworker --settings==napker.settings -v2