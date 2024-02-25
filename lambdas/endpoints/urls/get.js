const responses = require('../../common/api_responses.js');
const urls = require('../../common/databases/dynamodb.mjs').default;

const tableName = process.env.tableName;

module.exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.id) {
    return responses._400({ message: 'missing `id` from parameters' });
  }

  let id = event.pathParameters.id;

  const url = await urls.get(id, tableName).catch(err => {
    console.log("getUrl error: ", err);
    return null;
  });

  if (!url) {
    return responses._400({ message: 'URL not found' });
  }

  return responses._200(url);
}
