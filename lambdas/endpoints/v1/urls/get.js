import { _400, _200 } from '../../../common/API_Responses.js';
import database from '../../../common/databases/dynamodb.js';

const tableName = process.env.DYNAMODB_TABLE;

export async function handler(event) {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.id) {
    return _400({ message: 'missing `id` from parameters' });
  }

  const id = event.pathParameters.id;
  const data = await database.get(id, tableName).catch(err => {
    console.log("/endpoints/v1/urls/get - error: ", err);
    return null;
  });

  if (!data) {
    return _400({ message: 'URL not found' });
  }

  return _200(data.OriginalUrl);
}
