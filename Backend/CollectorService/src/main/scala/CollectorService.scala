import akka.actor.typed.{ActorSystem, ActorRef}
import akka.actor.typed.scaladsl.Behaviors
import scala.concurrent.Await
import scala.concurrent.duration.Duration

object CollectorService extends App {
  val messageBroker = new RabbitMQBroker()
  val system = ActorSystem(CollectorActor(messageBroker), "CollectorSystem")

  // keep the service alive
  sys.addShutdownHook {
    system.terminate()
  }

  Await.result(system.whenTerminated, Duration.Inf)
}
