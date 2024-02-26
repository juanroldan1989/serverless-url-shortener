import { _400, _200 } from '../../../common/API_Responses.js';
import queue from '../../../common/queues/sqs.js';

export async function handler(event) {
  console.log('event', event);
  const data = JSON.parse(event.body);

  if (!data || !data.url) {
    return _400({ message: 'missing `url` from payload' });
  }

  await queue.enqueue(data.url).catch(err => {
    console.log("/endpoints/v1/codes/urls/enqueue - error: ", err);
    return null;
  });

  return _200("url enqueued successfully");
}
