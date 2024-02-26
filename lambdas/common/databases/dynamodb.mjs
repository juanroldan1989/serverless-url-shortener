import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";
import { generateCode } from "../utils/generate_code.js";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const functions = {
  async get (id, tableName) {
    const params = {
      TableName: tableName,
      Key: {
        Id: id,
      },
    };
    const data = await dynamo.send(new GetCommand(params));

    if (!data || !data.Item) {
      throw Error(`Error fetching data for ID: ${id} from table: ${tableName}`);
    }

    console.log(data);

    return data.Item;
  },

  async create (url, tableName) {
    const timestamp = new Date().getTime();
    const id = await generateCode(url);
    const params = {
      TableName: tableName,
      Item: {
        Id: id.toString(),
        OriginalUrl: url,
        CreatedAt: timestamp,
        UpdatedAt: timestamp,
      },
    };

    const data = await dynamo.send(new PutCommand(params));

    if (!data) {
      throw Error(`Error generating code for url: ${url} in table: ${tableName}`);
    }

    console.log(data);

    return id;
  }
};

export default functions;
