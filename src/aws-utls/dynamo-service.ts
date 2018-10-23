import { AWSError, DynamoDB } from "aws-sdk";
const logger: any = require("@sc/logger")("Dynamo Service");
import { config, ConfigModel } from "../config";
import { GetOptions } from "../models/get-params";
import { UpsertOptions } from "../models/upsert-options";

export interface IDynamoService {
  /**
   * Establish a connection with the DynamoDB.
   */
  connect(): void;

  upsert<T>(params: UpsertOptions<T>): Promise<boolean>;

  get<T>(params: GetOptions<T>): Promise<any>;
}

export class DynamoService implements IDynamoService {
  private config: ConfigModel;
  private dynamoDB!: DynamoDB.DocumentClient;

  constructor() {
    this.config = config;
    this.dynamoDB = new DynamoDB.DocumentClient();
  }

  public connect(): void {
    try {
      logger.debug(`Connecting to DynamoBD`);
      this.dynamoDB = new DynamoDB.DocumentClient({
        apiVersion: this.config.AWS_API_VERSION,
        region: this.config.DYNAMO_REGION,
      });
    } catch (err) {
      const message: string = `An error occurred while attempting to connect to DynamoDB: ${err}`;
      throw new Error(message);
    }
  }

  public upsert<T>(params: UpsertOptions<T>): Promise<boolean> {
    return this.dynamoDB
      .put(params)
      .promise()
      .then(() => {
        logger.info(`Successful upsert into table: ${params.TableName}`);
        return true;
      })
      .catch((err: AWSError) => {
        logger.error(`Failed to upsert into table: ${params.TableName}`);
        throw new Error(err.message);
      });
  }

  public async get<T>(params: GetOptions<T>): Promise<any> {
    try {
      const data: any = await this.dynamoDB.get(params).promise();
      if (data && data.Item) {
        return data.Item;
      } else {
        return false;
      }
    } catch {
      logger.error(
        `Error occurred while trying to get ${JSON.stringify(
          params.Key,
        )} from table ${params.TableName}`,
      );
    }
  }
}
