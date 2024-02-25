const responses = require('../../common/api_responses.js');
const database = require('../../common/databases/dynamodb.mjs').default;
const tableName = process.env.tableName;

module.exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.url) {
    return responses._400({ message: 'missing `url` from parameters' });
  }

  const url = JSON.parse(event.body);
  const code = await database.create(url, tableName).catch(err => {
    console.log("endpoints/codes/create - error: ", err);
    return null;
  });

  if (!code) {
    return responses._400({ message: 'Failed to create code' });
  };

  return responses._200(code);
}
