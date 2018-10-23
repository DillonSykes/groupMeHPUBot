import { assert, expect } from "chai";
import "mocha";
import { MessageHandler } from "../../src/utils/message-handler";

describe("message-handler", () => {
  describe("isFix", () => {
    it("True", () => {
      const expected: boolean = true;
      const actual: boolean = MessageHandler.isFix("/fix needs to be fixed");
      expect(actual).to.equals(expected);
    });
    it("False", () => {
      const expected: boolean = false;
      const actual: boolean = MessageHandler.isFix("Does not need fixing");
      expect(actual).to.equals(expected);
    });
  });
});
