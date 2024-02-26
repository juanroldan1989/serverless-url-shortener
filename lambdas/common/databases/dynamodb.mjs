import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";
import { v1 } from "uuid";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const functions = {
  async get (id, tableName) {
    const params = {
      TableName: tableName,
      Key: {
        ID: id,
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
    const params = {
      TableName: tableName,
      Item: {
        ID: v1(),
        OriginalUrl: url,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    const data = await dynamo.send(new PutCommand(params));

    if (!data) {
      throw Error(`Error generating code for url: ${url} in table: ${tableName}`);
    }

    console.log(data);

    return data;
  }
};

export default functions;
