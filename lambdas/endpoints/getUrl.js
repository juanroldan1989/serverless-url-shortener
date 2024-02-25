const Responses = require('../common/API_Responses');
const urls = require('../common/Dynamo');

const tableName = process.env.tableName;

module.exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.id) {
    return Responses._400({ message: 'missing `id` from parameters' });
  }

  let id = event.pathParameters.id;

  const url = await urls.get(id, tableName).catch(err => {
    console.log("getUrl error: ", err);
    return null;
  });

  if (!url) {
    return Responses._400({ message: 'URL not found' });
  }

  return Responses._200(url);
}
