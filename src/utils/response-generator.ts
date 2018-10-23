const logger: any = require("@sc/logger")("Response Generator");
export default class ResponseGenerator {
  public static generate(status: number, body: any): any {
    const response: any = {
      body: JSON.stringify(body),
      statusCode: status,
    };
    return response;
  }
}
