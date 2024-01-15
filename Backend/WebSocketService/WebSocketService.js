const RabbitMQ = require("./src/shared/MessageBroker/RabbitMQ");
const logger = require("./src/shared/Logging/Winston");
const WebSocketServer = require("./src/WebSocketServer");
const EventHandler = require("./src/EventHandler");

// Listens to Message Broker and sends it to the client via WebSocket

const messageBroker = new RabbitMQ();
const webSocketServer = new WebSocketServer();
const eventHandler = new EventHandler(webSocketServer, messageBroker);

logger.info("WebSocketService initialized");
