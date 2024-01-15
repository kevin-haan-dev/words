const WebSocket = require("ws");
const logger = require("./shared/Logging/Winston");
const { serverConfig } = require("../config/websocket");

class WebSocketServer {
  constructor() {
    this.clients = new Set();
    this.webSocketData = {};
    this.server = new WebSocket.Server(serverConfig);
    this.setupEventListeners();
  }
  updateData(newData) {
    this.webSocketData = newData;
  }
  setupEventListeners() {
    this.server.on("connection", (client) => {
      this.addClient(client);
      client.on("close", () => {
        this.removeClient(client);
      });
    });
  }

  addClient(client) {
    this.clients.add(client);
    logger.info("Client connected");
    this.sendDataToClient(client);
  }

  removeClient(client) {
    this.clients.delete(client);
    logger.info("Client disconnected");
  }

  sendDataToClient(client) {
    if (this.webSocketData !== null) {
      client.send(JSON.stringify(this.webSocketData));
      logger.info("Sent data to client");
    }
  }

  broadcastToClients() {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        this.sendDataToClient(client);
      }
    });
  }
}

module.exports = WebSocketServer;
