import { assert, expect } from "chai";
import "mocha";
import { LambdaService } from "../../src/utils/lambda-service";
const AWS: any = require("aws-sdk-mock");

describe("lambda service", () => {
  const lambdaService: LambdaService = new LambdaService();
  describe("isOn", () => {
    it("On", () => {
      AWS.mock(
        "DynamoDB.DocumentClient",
        "get",
        (params: any, callback: any) => {
          callback(null, { Item: { isOn: true, status: "status" } });
        },
      );
      return lambdaService.isOn().then((res: any) => {
        expect(res).to.equal(true);
        AWS.restore();
      });
    });
    it("Off", () => {
      AWS.mock(
        "DynamoDB.DocumentClient",
        "get",
        (params: any, callback: any) => {
          callback(null, { Item: { isOn: false, status: "status" } });
        },
      );
      return lambdaService.isOn().then((res: any) => {
        expect(res).to.equal(false);
        AWS.restore();
      });
    });
  });
  describe("turnOff", () => {
    it("turns off", () => {
      const expected: any = {
        status: "status",
        isOn: true,
      };
      AWS.mock(
        "DynamoDB.DocumentClient",
        "put",
        (params: any, callback: any) => {
          callback(null, { Item: { isOn: false, status: "status" } });
        },
      );
      return lambdaService.turnOff().then((res: boolean) => {
        expect(res).to.deep.equal(true);
        AWS.restore();
      });
    });
  });
  describe("turnsOn", () => {
    it("turns on", () => {
      const expected: any = {
        status: "status",
        isOn: true,
      };
      AWS.mock(
        "DynamoDB.DocumentClient",
        "put",
        (params: any, callback: any) => {
          callback(null, { Item: { isOn: false, status: "status" } });
        },
      );
      return lambdaService.turnOn().then((res: any) => {
        expect(res).to.deep.equal(true);
        AWS.restore();
      });
    });
  });
});
