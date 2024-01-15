const amqplib = require("amqplib");
const EventEmitter = require("events");
const logger = require("../Logging/Winston");
const messageBrokerConfig = require("../../../config/rabbitMQ");

// Connects to Mesasge Broker service, consumes the specified queue, publishes to the specified queue
// Emits an event when a message is received

class RabbitMQ extends EventEmitter {
  constructor() {
    super();
    this.channel = null;
    this.connection = null;
    this.connect();
  }

  /**
   * Connects to the RabbitMQ server and consumes the specified queue
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
      logger.error("Could not connect to RabbitMQ yet. Trying Again");
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
   * Consume the specified queue
   *
   * @param {string} queueToConsume - the queue to consume
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
   * Publishes data to the specified queue
   *
   * @param {string} queueToPublish - The queue to publish to
   * @param {string} message - The data to be published
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
