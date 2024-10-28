FROM openjdk:21

WORKDIR /app

COPY ./whyy0u-1.0-SNAPSHOT.jar /app/whyy0u-1.0-SNAPSHOT.jar

RUN mkdir -p /app/whyy0u

COPY /whyy0u/file.csv /app/whyy0u/file.csv


CMD ["java", "-jar", "whyy0u-1.0-SNAPSHOT.jar"]
