const logger = require("../Winston");
const fs = require("fs");

describe("Logger functionality", () => {
  const testMessage = "Test message";

  beforeEach(() => {
    if (fs.existsSync("error.log")) fs.unlinkSync("error.log");
    if (fs.existsSync("combined.log")) fs.unlinkSync("combined.log");
  });

  it("logs info level messages to combined.log", () => {
    logger.log("info", testMessage);

    setTimeout(() => {
      expect(fs.existsSync("combined.log")).toBeTruthy();
      const logContent = fs.readFileSync("combined.log", "utf8");
      expect(logContent).toContain(testMessage);
    }, 500);
  });

  it("logs error level messages to error.log and combined.log", () => {
    logger.log("error", testMessage);

    setTimeout(() => {
      expect(fs.existsSync("error.log")).toBeTruthy();
      expect(fs.existsSync("combined.log")).toBeTruthy();
      const errorLogContent = fs.readFileSync("error.log", "utf8");
      const combinedLogContent = fs.readFileSync("combined.log", "utf8");
      expect(errorLogContent).toContain(testMessage);
      expect(combinedLogContent).toContain(testMessage);
    }, 500);
  });
});
