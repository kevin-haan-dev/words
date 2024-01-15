const RabbitMQ = require("../RabbitMQ");
const amqplib = require("amqplib");
const logger = require("../../Logging/Winston");

jest.mock("amqplib", () => {
  const mockChannel = {
    assertQueue: jest.fn().mockResolvedValue(),
    consume: jest.fn(),
    ack: jest.fn(),
    sendToQueue: jest.fn(),
  };
  return {
    connect: jest.fn().mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue(mockChannel),
    }),
  };
});

jest.mock("../../Logging/Winston", () => {
  return {
    info: jest.fn(),
    error: jest.fn(),
  };
});

describe("RabbitMQ class", () => {
  let rabbitMQ;

  beforeEach(() => {
    rabbitMQ = new RabbitMQ();
    jest.clearAllMocks();
  });

  it("connect method establishes connection", async () => {
    process.env.MESSAGEBROKER_USER = "user";
    process.env.MESSAGEBROKER_PASSWORD = "password";
    process.env.MESSAGEBROKER_HOST = "host";
    process.env.MESSAGEBROKER_PORT = "port";

    await rabbitMQ.connect();

    expect(amqplib.connect).toHaveBeenCalledWith(
      "amqp://user:password@host:port"
    );
    expect(rabbitMQ.connection).not.toBeNull();
    expect(rabbitMQ.channel).not.toBeNull();
  });

  it("publishToQueue publishes message to queue", async () => {
    const queueName = "testQueue";
    const message = "testMessage";

    await rabbitMQ.publishToQueue(queueName, message);

    expect(rabbitMQ.channel.assertQueue).toHaveBeenCalledWith(queueName, {
      durable: true,
    });
    expect(rabbitMQ.channel.sendToQueue).toHaveBeenCalledWith(
      queueName,
      Buffer.from(message)
    );
    expect(logger.info).toHaveBeenCalledWith("Sent message");
  });

  it("consumeQueue logs info on message received", async () => {
    const queueName = "testQueue";
    const mockData = { content: Buffer.from("Test message") };

    rabbitMQ.channel.consume = jest
      .fn()
      .mockImplementation((queue, callback) => {
        callback(mockData);
        return Promise.resolve();
      });

    await rabbitMQ.consumeQueue(queueName);

    expect(rabbitMQ.channel.consume).toHaveBeenCalledWith(
      queueName,
      expect.any(Function)
    );
    expect(logger.info).toHaveBeenCalledWith("Received message");
  });
});
