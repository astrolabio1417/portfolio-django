# Portfolio Django + Tailwind

### Run Docker Compose
```
docker compose up --build
```

### Initialize Test Data Database
```
python manage.py loaddata fixtures/initdata.json
```

### Credential
- user=astrolabio1417
- password=test

### Environment Variables
- DEBUG=True
- SECRET_KEY=
- PORT=8000
- ALLOWED_HOSTS=localhost
- POSTGRES_USER=username
- POSTGRES_PASSWORD=password
- POSTGRES_DB=mydatabase
- POSTGRES_PORT=5432
- POSTGRES_HOST=postgres_dev
- AWS_ACCESS_KEY_ID=
- AWS_S3_CUSTOM_DOMAIN=
- AWS_S3_ENDPOINT_URL=
- AWS_SECRET_ACCESS_KEY=
- AWS_STORAGE_BUCKET_NAME=
- DEPLOY=True
