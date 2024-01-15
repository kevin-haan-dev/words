class EventHandler {
  constructor(webSocketServer, messageBroker) {
    this.webSocketServer = webSocketServer;
    this.messageBroker = messageBroker;
    this.messageBroker.on("message", this.handleMessage.bind(this));
  }

  async handleMessage(data) {
    const dataString = data.content.toString();
    const webSocketData = JSON.parse(dataString);
    this.webSocketServer.updateData(webSocketData);
    this.webSocketServer.broadcastToClients(webSocketData);
  }
}

module.exports = EventHandler;
