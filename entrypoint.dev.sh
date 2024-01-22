#!/bin/sh

python manage.py migrate
python manage.py tailwind install

exec "$@"