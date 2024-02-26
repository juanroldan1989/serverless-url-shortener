const responses = require('../../../common/API_Responses.js');
const database = require('../../../common/databases/dynamodb.mjs').default;
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.id) {
    return responses._400({ message: 'missing `id` from parameters' });
  }

  const id = event.pathParameters.id;
  const data = await database.get(id, tableName).catch(err => {
    console.log("endpoints/urls/get - error: ", err);
    return null;
  });

  if (!data) {
    return responses._400({ message: 'URL not found' });
  }

  return responses._200(data.OriginalUrl);
}
