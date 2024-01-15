const RabbitMQ = require("./src/shared/MessageBroker/RabbitMQ");
const logger = require("./src/shared/Logging/Winston");
const Processor = require("./src/Processor");
const EventHandler = require("./src/EventHandler");

// Listens to Message Broker, processes incoming data from queue and sends it back to the broker

const messageBroker = new RabbitMQ();
const processor = new Processor();
const eventHandler = new EventHandler(messageBroker, processor);

if (eventHandler) {
  logger.info("ProcessorService initialized");
}
