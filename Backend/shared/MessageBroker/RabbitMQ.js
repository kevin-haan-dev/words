const amqplib = require("amqplib");
const EventEmitter = require("events");
const logger = require("../Logging/Winston");
const messageBrokerConfig = require("../../../config/rabbitMQ");

class RabbitMQ extends EventEmitter {
  constructor() {
    super();
    this.channel = null;
    this.connection = null;
    this.connect();
  }

  /**
   * Connects to the RabbitMQ server and consumes a specified queue.

   */
  async connect() {
    const rabbitMQUser = process.env.MESSAGEBROKER_USER;
    const rabbitMQPassword = process.env.MESSAGEBROKER_PASSWORD;
    const rabbitMQHost = process.env.MESSAGEBROKER_HOST;
    const rabbitMQPort = process.env.MESSAGEBROKER_PORT;
    this.amqpServer = `amqp://${rabbitMQUser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}`;

    const retryInterval = 5000;

    try {
      this.connection = await amqplib.connect(this.amqpServer);
      this.channel = await this.connection.createChannel();
      if (messageBrokerConfig.queueToConsume && this.connection && this.channel)
        this.consumeQueue(messageBrokerConfig.queueToConsume);
    } catch (error) {
      logger.error("Could not connect to RabbitMQ. Trying Again", error);
      setTimeout(
        () =>
          this.connect(
            rabbitMQUser,
            rabbitMQPassword,
            rabbitMQHost,
            rabbitMQPort,
            messageBrokerConfig.queueToConsume
          ),
        retryInterval
      );
    }
  }

  /**
   * Consume a specified queue.
   *
   * @param {string} queueToConsume - the name of the queue to consume
   */
  async consumeQueue(queueToConsume) {
    await this.channel.assertQueue(queueToConsume, {
      durable: true,
    });
    await this.channel.consume(queueToConsume, (data) => {
      logger.info("Received message");
      this.emit("message", data);
      this.channel.ack(data);
    });
  }

  /**
   * Publishes a message to a specified queue.
   *
   * @param {string} queueToPublish - The name of the queue to publish the message to.
   * @param {string} message - The message to be published.
   */
  async publishToQueue(queueToPublish, message) {
    if (!this.channel) {
      logger.error("Channel not initialized. Could not send message");
      return;
    }

    try {
      await this.channel.assertQueue(queueToPublish, { durable: true });
      this.channel.sendToQueue(queueToPublish, Buffer.from(message));
      logger.info("Sent message");
    } catch (error) {
      logger.error("Error sending message", error);
    }
  }
}

module.exports = RabbitMQ;
