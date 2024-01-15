import { describe, it, expect, beforeEach, vi } from "vitest";
import WebSocketService from "../src/services/WebSocketService";

class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = WebSocket.OPEN;
    this.close = vi.fn().mockImplementation(() => {
      this.readyState = WebSocket.CLOSED;
    });
    this.onopen = vi.fn();
    this.onerror = vi.fn();
    this.onmessage = vi.fn();
  }
}

global.WebSocket = MockWebSocket;

describe("WebSocketService", () => {
  let webSocketService;
  const testUrl = "ws://test-url";

  beforeEach(() => {
    webSocketService = new WebSocketService(testUrl);
  });

  it("should create a new WebSocket when connect is called", () => {
    webSocketService.connect();
    expect(webSocketService.webSocketClient).not.toBeNull();
    expect(webSocketService.webSocketClient.url).toBe(testUrl);
  });

  it("should set the provided event handlers", () => {
    const mockOnMessage = vi.fn();
    const mockOnError = vi.fn();
    const mockOnOpen = vi.fn();

    webSocketService.connect(mockOnMessage, mockOnError, mockOnOpen);

    webSocketService.webSocketClient.onopen();
    expect(mockOnOpen).toHaveBeenCalled();

    webSocketService.webSocketClient.onerror();
    expect(mockOnError).toHaveBeenCalled();

    webSocketService.webSocketClient.onmessage();
    expect(mockOnMessage).toHaveBeenCalled();
  });

  it("should close the WebSocket when disconnect is called", () => {
    webSocketService.connect();
    webSocketService.disconnect();
    expect(webSocketService.webSocketClient.close).toHaveBeenCalled();
    expect(webSocketService.webSocketClient.readyState).toBe(WebSocket.CLOSED);
  });
});
