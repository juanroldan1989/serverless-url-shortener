import database from '../../common/databases/dynamodb.js';

const tableName = process.env.DYNAMODB_TABLE;

export async function handler(event) {
  for (const record of event.Records) {
    console.log("Message Body: ", record.body);
    const url = record.body;

    if (!url) {
      return _400({ message: 'missing `url` from message' });
    }

    const code = await database.create(url, tableName).catch(err => {
      console.log("workers/codes/create - error: ", err);
      return null;
    });

    if (!code) {
      return _400({ message: 'Failed to create code' });
    };
  }

  return _200(code);
}
