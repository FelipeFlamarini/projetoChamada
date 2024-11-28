FROM python:3.12.7-alpine3.20

WORKDIR /app

COPY requirements.txt ./requirements.txt

RUN python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt

CMD source .venv/bin/activate && fastapi dev app.py --host 0.0.0.0 --port 8000