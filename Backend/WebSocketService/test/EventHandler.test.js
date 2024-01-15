const EventHandler = require("../src/EventHandler");
const WebSocketServer = require("../src/WebSocketServer");
const RabbitMQ = require("../src/shared/MessageBroker/RabbitMQ"); 

jest.mock("../src/WebSocketServer");
jest.mock("../src/shared/MessageBroker/RabbitMQ");

describe("EventHandler", () => {
  let mockWebSocketServer;
  let mockMessageBroker;
  let eventHandler;

  beforeEach(() => {
    mockWebSocketServer = new WebSocketServer();
    mockMessageBroker = new RabbitMQ();

    WebSocketServer.mockClear();
    RabbitMQ.mockClear();

    eventHandler = new EventHandler(mockWebSocketServer, mockMessageBroker);
  });

  it("should set message event listener on message broker on instantiation", () => {
    expect(mockMessageBroker.on).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );
  });

  it("should handle incoming messages correctly", async () => {
    const mockData = { content: Buffer.from(JSON.stringify({ key: "value" })) };

    await eventHandler.handleMessage(mockData);

    expect(mockWebSocketServer.updateData).toHaveBeenCalledWith({
      key: "value",
    });
    expect(mockWebSocketServer.broadcastToClients).toHaveBeenCalled();
  });
});
