import * as lambda from "aws-lambda";
import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import { GroupMe } from "./group-me";
import { LambdaService } from "./utils/lambda-service";
import { MessageHandler } from "./utils/message-handler";
import ResponseGenerator from "./utils/response-generator";
const logger: any = require("@sc/logger")("Handler");
export function getStuff(
  event: lambda.APIGatewayEvent,
  context: lambda.Context,
  callback: lambda.Callback,
): any {
  logger.debug(`Event: ${JSON.stringify(event)}`);
  const body: any = event.body;
  const groupMe: GroupMe = JSON.parse(body);
  logger.debug(`GroupMe: ${JSON.stringify(groupMe)}`);
  const message: string = groupMe.text;
  logger.debug(`Text: ${message}`);
  const lambdaService: LambdaService = new LambdaService();
  if (MessageHandler.turnOn(groupMe)) {
    return lambdaService.turnOn().then((res: boolean) => {
      if (res) {
        axios.post("https://api.groupme.com/v3/bots/post", {
          bot_id: config.GROUP_ID,
          text: "Bot is on...",
        });
        callback(null, ResponseGenerator.generate(200, "Done"));
      }
      callback(null, ResponseGenerator.generate(200, "Done"));
    });
  }
  if (MessageHandler.turnOff(groupMe)) {
    logger.info("Turning Bot off...");
    logger.debug("Turning Bot off...");
    return lambdaService.turnOff().then((res: boolean) => {
      logger.debug(`Turning off: ${res}`);
      if (res) {
        axios.post("https://api.groupme.com/v3/bots/post", {
          bot_id: config.GROUP_ID,
          text: "Bot is off...",
        });
        logger.info("Bot is off...");
        callback(null, ResponseGenerator.generate(200, "Done"));
      }
      callback(null, ResponseGenerator.generate(200, "Done"));
    });
  }
  if (groupMe.name !== "fuck") {
    return lambdaService.isOn().then((on: boolean) => {
      logger.debug("isOn: " + on);
      if (on) {
        if (MessageHandler.isFix(message)) {
          axios.post("https://api.groupme.com/v3/bots/post", {
            bot_id: config.GROUP_ID,
            text: "Not working yet",
          });
          callback(null, ResponseGenerator.generate(200, "Done"));
        }
        if (MessageHandler.isNSFW(message)) {
          axios.post("https://api.groupme.com/v3/bots/post", {
            bot_id: config.GROUP_ID,
            text:
              "NSFW FILTER ACTIVATED... \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n ...",
          });
          logger.info("Bot responded");
          callback(null, ResponseGenerator.generate(200, "Done"));
        }
      } else {
        callback(null, ResponseGenerator.generate(200, "Done"));
      }
    });
  }
}
