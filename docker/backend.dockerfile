FROM openjdk:21-slim

RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /app/images

COPY ./v2-0.0.1-SNAPSHOT.jar /app/v2-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["sh", "-c", "while ! mysqladmin ping -h mysql --silent; do sleep 2; done; java -jar /app/v2-0.0.1-SNAPSHOT.jar"]
