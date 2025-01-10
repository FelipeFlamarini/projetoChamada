FROM python:3.12.8

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

ENTRYPOINT [ "fastapi", "dev", "app.py" ]

CMD ["--host", "0.0.0.0", "--port", "8000"]
