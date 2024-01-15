FROM sbtscala/scala-sbt:eclipse-temurin-focal-17.0.9_9_1.9.8_3.3.1

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE $PORT

RUN sbt compile

CMD ["sbt", "run"]