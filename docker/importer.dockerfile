FROM openjdk:21-slim

WORKDIR /app

COPY ./whyy0u-1.0-SNAPSHOT.jar /app/whyy0u-1.0-SNAPSHOT.jar
COPY /whyy0u/file.csv /app/whyy0u/file.csv

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["sh", "-c", "while ! nc -z backend 8080; do sleep 2; done; java -jar /app/whyy0u-1.0-SNAPSHOT.jar"]
