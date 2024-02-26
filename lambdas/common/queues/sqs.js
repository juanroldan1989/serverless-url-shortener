import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient();
const queueUrl = process.env.SQS_URL;
const functions = {
  async enqueue (url) {
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(url),
    };
    const data = await sqs.send(new SendMessageCommand(params));

    if (!data) {
      throw Error(`Error sending message to queue: ${queueUrl}`);
    }

    return data;
  }
};

export default functions;
