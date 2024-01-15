const messageBrokerConfig = require("../config/rabbitMQ");

// listens to events from the message brkoer

class EventHandler {
  constructor(messageBroker, processor) {
    this.processor = processor;
    this.messageBroker = messageBroker;
    this.messageBroker.on("message", this.handleMessage.bind(this));
  }

  /**
   * Handles a message from the message broker, processes it and publishes it to a new queue.
   *
   * @param {Object} data - The data to be processed and published.
   */
  async handleMessage(data) {
    const processedData = this.processor.processData(data);
    await this.messageBroker.publishToQueue(
      messageBrokerConfig.queueToPublish,
      processedData
    );
  }
}

module.exports = EventHandler;
