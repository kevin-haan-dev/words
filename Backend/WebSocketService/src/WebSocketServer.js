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
  /**
   * Updates the data to be sent to new clients
   *
   * @param {type} newData new data to update
   */
  updateData(newData) {
    this.webSocketData = newData;
  }
  /**
   * Sets up event listeners for the server connection
   */
  setupEventListeners() {
    this.server.on("connection", (client) => {
      this.addClient(client);
      client.on("close", () => {
        this.removeClient(client);
      });
    });
  }

  /**
   * Adds a client to the list of connected clients
   *
   * @param {type} client client to be added
   */
  addClient(client) {
    this.clients.add(client);
    logger.info("Client connected");
    this.sendDataToClient(client);
  }

  /**
   * Removes a client from the list of connected clients
   *
   * @param {object} client client to be removed
   */
  removeClient(client) {
    this.clients.delete(client);
    logger.info("Client disconnected");
  }

  /**
   * Sends data to the client
   *
   * @param {Object} client client object
   */
  sendDataToClient(client) {
    if (this.webSocketData !== null) {
      client.send(JSON.stringify(this.webSocketData));
      logger.info("Sent data to client");
    }
  }

  /**
   * Broadcasts data to all connected clients
   */
  broadcastToClients() {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        this.sendDataToClient(client);
      }
    });
  }
}

module.exports = WebSocketServer;
