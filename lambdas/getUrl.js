'use strict';

const Responses = require('./API_Responses');

module.exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.id) {
    return Responses._400({ message: 'missing `id` from parameters' });
  }

  let id = event.pathParameters.id;

  if (urls[id]) {
    return Responses._200(urls[id]);
  };

  return Responses._400({ message: 'URL not found' });
}

const urls = {
  1234: 'https://sample-really-long-url.com',
  5678: 'https://another-really-long-url.com',
  9012: 'https://yet-another-really-long-url.com',
}
