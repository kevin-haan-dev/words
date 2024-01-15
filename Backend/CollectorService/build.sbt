name := "CollectorService"

version := "0.1"

scalaVersion := "3.3.1"

resolvers += "Akka library repository".at("https://repo.akka.io/maven")

val AkkaVersion = "2.9.1"
val AkkaHttpVersion = "10.6.0"
val RabbitMQVersion = "5.14.2"
val LogbackVersion = "1.4.14"
val SLF4JVersion = "2.0.11"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream" % AkkaVersion,
  "com.typesafe.akka" %% "akka-http" % AkkaHttpVersion,
  "com.rabbitmq" % "amqp-client" % RabbitMQVersion,
  "ch.qos.logback" % "logback-classic" % LogbackVersion,
  "org.slf4j" % "slf4j-api" % SLF4JVersion
)

assembly / assemblyMergeStrategy := {
  case PathList("META-INF", xs @ _*) => MergeStrategy.discard
  case "module-info.class" => MergeStrategy.first
  case x => (assembly / assemblyMergeStrategy).value(x)
}
