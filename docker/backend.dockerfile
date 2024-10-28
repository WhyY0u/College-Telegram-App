FROM openjdk:21

WORKDIR /app

COPY ./v2-0.0.1-SNAPSHOT.jar /app/v2-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "v2-0.0.1-SNAPSHOT.jar"]
