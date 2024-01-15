const RabbitMQ = require("../src/shared/MessageBroker/RabbitMQ");
const logger = require("../src/shared/Logging/Winston");
const Processor = require("../src/Processor");
const EventHandler = require("../src/EventHandler");

jest.mock("../src/shared/MessageBroker/RabbitMQ");
jest.mock("../src/shared/Logging/Winston");
jest.mock("../src/Processor");

describe("ProcessorService Initialization", () => {
  let messageBroker;
  let processor;
  let eventHandler;

  beforeEach(() => {
    messageBroker = new RabbitMQ();
    processor = new Processor();
    eventHandler = new EventHandler(messageBroker, processor);
  });

  it("should initialize EventHandler with messageBroker and processor", () => {
    expect(messageBroker.on).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );
    expect(eventHandler).toBeDefined();
  });
});
