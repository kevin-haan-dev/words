const RabbitMQ = require("../src/shared/MessageBroker/RabbitMQ");
const logger = require("../src/shared/Logging/Winston");
const WebSocketServer = require("../src/WebSocketServer");
const EventHandler = require("../src/EventHandler");

jest.mock("../src/shared/MessageBroker/RabbitMQ");
jest.mock("../src/shared/Logging/Winston");
jest.mock("../src/WebSocketServer");
jest.mock("../src/EventHandler", () => {
  return jest.fn().mockImplementation((webSocketServer, messageBroker) => ({
    webSocketServer,
    messageBroker,
  }));
});

describe("WebSocketService Initialization", () => {
  let WebSocketService;

  beforeEach(() => {
    RabbitMQ.mockClear();
    WebSocketServer.mockClear();
    EventHandler.mockClear();
    logger.info.mockClear();

    WebSocketService = require("../WebSocketService");
  });

  it("should create instances of RabbitMQ, WebSocketServer, and EventHandler", () => {
    expect(RabbitMQ).toHaveBeenCalledTimes(1);
    expect(WebSocketServer).toHaveBeenCalledTimes(1);
    expect(EventHandler).toHaveBeenCalledTimes(1);
  });
});
