import scala.util.{Try, Failure, Success}
import com.rabbitmq.client.{Connection, ConnectionFactory, Channel, Delivery, DeliverCallback}
import java.io.IOException
import org.slf4j.LoggerFactory
import scala.concurrent.duration._
import scala.util.control.NonFatal

class RabbitMQBroker extends MessageBroker {
  private val logger = LoggerFactory.getLogger(this.getClass)
  private val connection: Connection = createConnection()
  private val channel: Channel = connection.createChannel()

  private def createConnection(): Connection = {
    var connection: Option[Connection] = None
    var attempts = 0
    val delay = 5.seconds

    val messageBrokerUser = sys.env.get("MESSAGEBROKER_USER").getOrElse("default_user")
    val messageBrokerPassword = sys.env.get("MESSAGEBROKER_PASSWORD").getOrElse("default_pw")
    val messageBrokerHost = sys.env.get("MESSAGEBROKER_HOST").getOrElse("message-broker")
    val messageBrokerPort = 5672

    while (connection.isEmpty) {
      try {
        val connectionFactory = new ConnectionFactory()
          connectionFactory.setUsername(messageBrokerUser);
          connectionFactory.setPassword(messageBrokerPassword);
          connectionFactory.setVirtualHost("/");
          connectionFactory.setHost(messageBrokerHost);
          connectionFactory.setPort(messageBrokerPort);
          connection = Some(connectionFactory.newConnection())
      } catch {
        case NonFatal(e) =>
          logger.error(s"Failed to connect to RabbitMQ. Trying again.")
          Thread.sleep(delay.toMillis)
      }
    }

    connection.getOrElse(throw new IOException("Could not connect to RabbitMQ"))
  }

  override def sendMessage(message: String, queueName: String): Unit = {
    logger.info(s"Sending message")
    channel.queueDeclare(queueName, true, false, false, null)
    channel.basicPublish("", queueName, null, message.getBytes("UTF-8"))
  }

  override def receiveMessage(callback: String => Unit, queueName: String): Unit = {
    val deliverCallback = new DeliverCallback {
      override def handle(consumerTag: String, delivery: Delivery): Unit = {
        logger.info(s"Receiving message")

        val messageString = new String(delivery.getBody, "UTF-8")
        callback(messageString)
      }
    }
    channel.queueDeclare(queueName, true, false, false, null)
    channel.basicConsume(queueName, true, deliverCallback, _ => {})
  }
}
