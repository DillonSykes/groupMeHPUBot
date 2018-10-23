import { DynamoService } from "../aws-utls/dynamo-service";
import { GetOptions } from "../models/get-params";
import { UpsertOptions } from "../models/upsert-options";
const logger: any = require("@sc/logger")("Lambda Service");
export class LambdaService {
  public dynamoService: DynamoService = new DynamoService();
  constructor() {
    this.dynamoService.connect();
  }
  public async isOn(): Promise<boolean> {
    this.dynamoService.connect();
    const key: any = {
      status: "status",
    };
    const params: GetOptions<any> = new GetOptions("group-me", key);
    const ender: boolean = await this.dynamoService.get(params)
      .then((res: any) => {
        logger.debug(`Get Response: ${JSON.stringify(res)}`);
        return res.isOn === true;
      });
    return ender;
  }
  public async turnOn(): Promise<boolean> {
    const key: any = {
      status: "status",
      isOn: true,
    };
    const params: UpsertOptions<any> = new UpsertOptions("group-me", key);
    return await this.dynamoService.upsert(params);
  }
  public async turnOff(): Promise<boolean> {
    const key: any = {
      status: "status",
      isOn: false,
    };
    const params: UpsertOptions<any> = new UpsertOptions("group-me", key);
    return await this.dynamoService.upsert(params);
  }
}
