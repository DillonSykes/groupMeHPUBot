import { config } from "../config";
import { GroupMe } from "../group-me";
const logger: any = require("@sc/logger")("Message Handler");
export class MessageHandler {
  public static isFix(text: string): boolean {
    return text.includes("/fix");
  }
  public static isNSFW(text: string): boolean {
    return text === "/NSFW";
  }
  public static turnOn(obj: GroupMe): boolean {
    logger.debug("Sender: " + obj.name);
    if (obj.text === "/on" && obj.name === config.ADMIN) {
      return true;
    }
    return false;
  }
  public static turnOff(obj: GroupMe): boolean {
    logger.debug("Sender: " + obj.name);
    if (obj.text === "/off" && obj.name === config.ADMIN) {
      return true;
    }
    return false;
  }
  constructor(public groupMe: GroupMe) {}
}
