#!/bin/sh
cd /app/backend
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn --bind 0.0.0.0:8000 myproject.wsgi:application