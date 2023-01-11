FROM python:3.10-alpine

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /usr/src
COPY requirements.txt /usr/src

RUN pip install --no-cache-dir --upgrade -r requirements.txt
    
COPY . .
    
EXPOSE 80
ENV PORT=80

RUN ["chmod", "+x", "/usr/src/entrypoint.sh"]
ENTRYPOINT ["/usr/src/entrypoint.sh"]