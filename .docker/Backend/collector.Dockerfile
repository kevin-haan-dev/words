# uses precompiled Fat JAR created with sbt assembly

FROM openjdk:17-alpine

WORKDIR /usr/src/app

COPY ./target/scala-3.3.1/CollectorService-assembly-0.1.jar /usr/src/app/collector.jar

EXPOSE $PORT

CMD ["java", "-jar", "collector.jar"]
