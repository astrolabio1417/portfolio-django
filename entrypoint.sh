#!/bin/sh

while ! ./manage.py sqlflush > /dev/null 2>&1 ;do
    echo "Waiting for the db to be ready."
    sleep 1
done

python manage.py migrate
python manage.py collectstatic --noinput
python manage.py loaddata fixtures/initdata.json

exec gunicorn portfolio.wsgi --bind 0.0.0.0:$PORT --workers 4 --thread 4 --timeout 300 --access-logfile '-' --error-logfile '-'