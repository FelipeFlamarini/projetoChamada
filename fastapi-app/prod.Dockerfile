FROM python:3.12.8

SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY requirements.txt .

RUN python3 -m venv .venv
RUN source .venv/bin/activate
RUN pip install -r requirements.txt

RUN addgroup --system fastapi && adduser --system --group fastapi
RUN mkdir -p /app/vectors
RUN mkdir -p /app/students_images

RUN chown -R fastapi:fastapi /app

COPY . .

USER fastapi

ENTRYPOINT ["fastapi", "run", "app.py"]

CMD ["--host", "0.0.0.0", "--port", "8000"]