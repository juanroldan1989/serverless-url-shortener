const responses = require('../../../common/api_responses.js');
const database = require('../../../common/databases/dynamodb.mjs').default;
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.id) {
    return responses._400({ message: 'missing `id` from parameters' });
  }

  const id = event.pathParameters.id;
  const url = await database.get(id, tableName).catch(err => {
    console.log("endpoints/urls/get - error: ", err);
    return null;
  });

  if (!url) {
    return responses._400({ message: 'URL not found' });
  }

  return responses._200(url);
}
