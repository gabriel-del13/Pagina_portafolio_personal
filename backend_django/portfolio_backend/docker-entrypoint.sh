#!/bin/bash
set -e

echo "Fixing entire /app directory ownership..."
chown -R appuser:appuser /app

echo "Fixing permissions..."
mkdir -p /app/staticfiles /app/media /app/logs
chown -R appuser:appuser /app/staticfiles /app/media /app/logs

echo "Waiting for postgres..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1
done
echo "PostgreSQL started"

echo "Running migrations..."
gosu appuser python manage.py migrate --noinput

echo "Collecting static files..."
gosu appuser python manage.py collectstatic --noinput

if [ "$DJANGO_SUPERUSER_USERNAME" ]; then
    gosu appuser python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists():
    User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD')
    print('Superuser created.')
else:
    user = User.objects.get(username='$DJANGO_SUPERUSER_USERNAME')
    user.set_password('$DJANGO_SUPERUSER_PASSWORD')
    user.email = '$DJANGO_SUPERUSER_EMAIL'
    user.save()
    print('Superuser already exists. Password updated.')
END
fi

echo "Starting server..."
exec gosu appuser gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:8000 --workers 4 --timeout 120