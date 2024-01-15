const Processor = require("../src/Processor");

describe("Processor", () => {
  let processor;

  beforeEach(() => {
    processor = new Processor();
  });

  it("should process data and return a word map", () => {
    const mockData = {
      content: Buffer.from(
        JSON.stringify([
          {
            title: { rendered: "Test Title 1" },
            content: { rendered: "<p>This is a test. Test sentence.</p>" },
          },
          {
            title: { rendered: "Test Title 2" },
            content: { rendered: "<p>Another test sentence.</p>" },
          },
        ])
      ),
    };

    const expectedResult = JSON.stringify({
      "Test Title 1": { This: 1, is: 1, test: 2, sentence: 1 },
      "Test Title 2": { Another: 1, test: 1, sentence: 1 },
    });

    const result = processor.processData(mockData);
    expect(result).toEqual(expectedResult);
  });
});
