const responses = require('../../common/api_responses.js');
const database = require('../../common/databases/dynamodb.mjs').default;
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  console.log('event', event);
  const data = JSON.parse(event.body);

  if (!data || !data.url) {
    return responses._400({ message: 'missing `url` from payload' });
  }

  const code = await database.create(data.url, tableName).catch(err => {
    console.log("endpoints/codes/create - error: ", err);
    return null;
  });

  if (!code) {
    return responses._400({ message: 'Failed to create code' });
  };

  return responses._200({ code: code });
}
