FROM python:3.10-alpine

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /usr/src
COPY requirements.txt /usr/src

RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN pip install -e git+https://github.com/mjs7231/django-dbbackup.git#egg=django-dbbackup
    
COPY . .

RUN ["chmod", "+x", "/usr/src/entrypoint.sh"]
ENTRYPOINT ["/usr/src/entrypoint.sh"]