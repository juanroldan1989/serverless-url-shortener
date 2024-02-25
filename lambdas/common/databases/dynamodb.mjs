import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const functions = {
  async get (id, tableName) {
    const data = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          id: id,
        },
      })
    );

    if (!data || !data.Item) {
      throw Error(`Error fetching data for ID: ${id} from table: ${tableName}`);
    }

    console.log(data);

    return data.Item;
  }
};

export default functions;
