import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.settings.ConnectionPoolSettings
import scala.concurrent.Future

object HttpClient {
  def fetchPosts(implicit system: ActorSystem): Future[HttpResponse] = {
    val request = HttpRequest(uri = "https://thekey.academy/wp-json/wp/v2/posts?_fields=content,title")
    Http().singleRequest(request, settings = ConnectionPoolSettings(system))
  }
}
