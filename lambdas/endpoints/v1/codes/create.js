import { _400, _200 } from '../../../common/API_Responses.js';
import database from '../../../common/databases/dynamodb.js';

const tableName = process.env.DYNAMODB_TABLE;

export async function handler(event) {
  console.log('event', event);
  const data = JSON.parse(event.body);

  if (!data || !data.url) {
    return _400({ message: 'missing `url` from payload' });
  }

  const code = await database.create(data.url, tableName).catch(err => {
    console.log("endpoints/codes/create - error: ", err);
    return null;
  });

  if (!code) {
    return _400({ message: 'Failed to create code' });
  };

  return _200(code);
}
