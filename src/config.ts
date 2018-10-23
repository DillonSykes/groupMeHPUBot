import dotenv = require("dotenv");
dotenv.config();

import * as envalid from "envalid";
const { str } = envalid;

export class ConfigModel {
  public LOG_LEVEL: string;
  public DYNAMO_REGION: string;
  public AWS_API_VERSION: string;
  public GROUP_ID: string;
  public ADMIN: string;
}

export const config: any = envalid.cleanEnv<ConfigModel>(process.env, {
  AWS_API_VERSION: str(),
  DYNAMO_REGION: str(),
  LOG_LEVEL: str(),
  GROUP_ID: str(),
  ADMIN: str(),
});
