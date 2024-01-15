import { toast } from "react-toastify";

class WebSocketService {
  constructor(url) {
    this.url = url;
    this.webSocketClient = null;
  }

  /**
   * Connects to the WebSocket server and sets up event listeners.
   *
   * @param {function} onMessage - The function to be called when a message is received.
   * @param {function} onError - The function to be called when an error occurs.
   * @param {function} onOpen - The function to be called when the connection is successfully opened.
   */
  connect(onMessage, onError, onOpen) {
    if (
      !this.webSocketClient ||
      this.webSocketClient.readyState === WebSocket.CLOSED
    ) {
      this.webSocketClient = new WebSocket(this.url);
    }

    this.webSocketClient.onopen = () => {
      if (onOpen) onOpen();
    };
    this.webSocketClient.onerror = (error) => {
      if (onError) onError(error);
    };
    this.webSocketClient.onmessage = (event) => {
      if (onMessage) onMessage(event);
    };
  }

  disconnect() {
    if (this.webSocketClient) {
      this.webSocketClient.close();
    }
  }
}

export default WebSocketService;
