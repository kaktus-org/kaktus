FROM python:3.12-slim

WORKDIR /app

COPY .. /app

RUN apt-get update && apt-get install -y \
    postgresql-client \
    libpq-dev \
    gcc

RUN pip install poetry && poetry install

CMD ["poetry", "run", "start-api"]
