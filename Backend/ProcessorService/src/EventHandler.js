const messageBrokerConfig = require("../config/rabbitMQ");

class EventHandler {
  constructor(messageBroker, processor) {
    this.processor = processor;
    this.messageBroker = messageBroker;
    this.messageBroker.on("message", this.handleMessage.bind(this));
  }

  async handleMessage(data) {
    const processedData = this.processor.processData(data);
    await this.messageBroker.publishToQueue(
      messageBrokerConfig.queueToPublish,
      processedData
    );
  }
}

module.exports = EventHandler;
