const RabbitMQ = require("./src/shared/MessageBroker/RabbitMQ");
const logger = require("./src/shared/Logging/Winston");
const Processor = require("./src/Processor");
const EventHandler = require("./src/EventHandler");

const messageBroker = new RabbitMQ();
const processor = new Processor();
const eventHandler = new EventHandler(messageBroker, processor);

if (eventHandler) {
  logger.info("ProcessorService initialized");
}
