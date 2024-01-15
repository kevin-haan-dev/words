import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior}
import akka.http.scaladsl.model._
import scala.concurrent.duration._
import scala.util.{Success, Failure}
import akka.http.scaladsl.unmarshalling.Unmarshal
import org.slf4j.LoggerFactory

object CollectorActor {
  sealed trait Command
  final case class CollectData(data: String) extends Command
  case object FetchPosts extends Command
  private val logger = LoggerFactory.getLogger(this.getClass)

  def apply(messageBroker: MessageBroker): Behavior[Command] = 
    Behaviors.setup { context =>
      implicit val system = context.system
      implicit val ec = system.executionContext
      val classicSystem = system.classicSystem

      val queueToPublish = "collector_service.to.processor_service"

      system.scheduler.scheduleWithFixedDelay(0.seconds, 10.seconds)(() => {
        logger.info("Starting HTTP Request")
        context.self ! FetchPosts
      })

      Behaviors.receiveMessage {
        case FetchPosts =>
          HttpClient.fetchPosts(classicSystem).onComplete {
            case Success(response) =>
              response.status match {
                case StatusCodes.OK =>
                  Unmarshal(response.entity).to[String].onComplete {
                    case Success(data) => 
                      messageBroker.sendMessage(data, queueToPublish)
                    case Failure(exception) => 
                      logger.error(s"Failed to unmarshal JSON: ${exception.getMessage}")
                  }
                case _ =>
                  logger.error(s"Request failed, response code: ${response.status}")
              }

            case Failure(exception) =>
              logger.error(s"Error while fetching posts: ${exception.getMessage}")
          }
          Behaviors.same
    }
  }
}
