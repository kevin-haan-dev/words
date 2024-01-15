const EventHandler = require("../src/EventHandler");
const RabbitMQ = require("../src/shared/MessageBroker/RabbitMQ");
const Processor = require("../src/Processor");

jest.mock("../src/shared/MessageBroker/RabbitMQ");
jest.mock("../src/Processor");

describe("EventHandler", () => {
  let mockMessageBroker;
  let mockProcessor;
  let eventHandler;

  beforeEach(() => {
    mockMessageBroker = new RabbitMQ();
    mockProcessor = new Processor();

    RabbitMQ.mockClear();
    Processor.mockClear();

    eventHandler = new EventHandler(mockMessageBroker, mockProcessor);
  });

  it("should set message event listener on message broker on instantiation", () => {
    expect(mockMessageBroker.on).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );
  });

  it("should handle incoming messages correctly", async () => {
    const mockData = "testData";
    const processedData = "processedData";

    mockProcessor.processData.mockReturnValue(processedData);

    await eventHandler.handleMessage(mockData);

    expect(mockProcessor.processData).toHaveBeenCalledWith(mockData);
    expect(mockMessageBroker.publishToQueue).toHaveBeenCalledWith(
      expect.any(String)
    );
  });
});
