const WebSocketServer = require("../src/WebSocketServer");
const WebSocket = require("ws");
const logger = require("../src/shared/Logging/Winston");

jest.mock("ws");
jest.mock("../src/shared/Logging/Winston", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("WebSocketServer", () => {
  let server;
  const mockClient = {
    send: jest.fn(),
    readyState: WebSocket.OPEN,
    on: jest.fn(),
  };

  beforeEach(() => {
    server = new WebSocketServer();
  });

  test("should add client on connection", () => {
    WebSocket.Server.mock.instances[0].on.mock.calls[0][1](mockClient);
    expect(server.clients.has(mockClient)).toBeTruthy();
    expect(logger.info).toHaveBeenCalledWith("Client connected");
  });

  test("should send data to client", () => {
    const testData = { key: "value" };
    server.updateData(testData);
    server.sendDataToClient(mockClient);
    expect(mockClient.send).toHaveBeenCalledWith(JSON.stringify(testData));
  });

  test("should broadcast data to all clients", () => {
    server.clients.add(mockClient);
    const testData = { key: "value" };
    server.updateData(testData);
    server.broadcastToClients();
    expect(mockClient.send).toHaveBeenCalledWith(JSON.stringify(testData));
  });
});
