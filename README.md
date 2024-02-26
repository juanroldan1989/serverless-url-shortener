# Serverless URL Shortener

<img src="https://github.com/juanroldan1989/terraform-url-shortener/raw/main/screenshots/url-shortener-infra-1.png" width="100%" />

# Core Features

- Generate **code** for shortened URL (`/codes` endpoint):

```ruby
$ curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: <api-key>" \
  -d '{"url": "https://really-long-url.com"}' \
  https://<api-gateway-id>.execute-api.<aws-region>.amazonaws.com/dev/v1/codes

> 95188452
```

- Retrieve **url** based on code (`/urls` endpoint):

```ruby
$ curl https://<api-gateway-id>.execute-api.<aws-region>.amazonaws.com/dev/v1/urls/<code>

> "https://really-long-url.com"
```

- Enqueue url into SQS queue. Code generation process decoupled from API Gateway (CQRS approach):

```ruby
$ curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: <api-key>" \
  -d '{"url": "https://really-long-url.com"}' \
  https://<api-gateway-id>.execute-api.<aws-region>.amazonaws.com/dev/v1/urls/enqueue

> "url enqueued successfully"
```

# Setup

1. Clone repository.

2. Install and Configure Serverless framework:

https://www.serverless.com/framework/docs/getting-started

```ruby
$ npm install -g serverless
```

3. CD into project folder:

```ruby
$ sls deploy

Deploying serverless-url-shortener to stage dev (us-east-1)

✔ Service deployed to stack serverless-url-shortener-dev (84s)

api keys:
  dev-BasicPlanKey: xxxx (auto-generated value at deployment time)
  dev-FreePlanKey: yyyy (auto-generated value at deployment time)
  dev-PremiumPlanKey: zzzz (auto-generated value at deployment time)
endpoints:
  GET - https://zk4bac5f0b.execute-api.us-east-1.amazonaws.com/dev/v1/urls/{id}
  POST - https://zk4bac5f0b.execute-api.us-east-1.amazonaws.com/dev/v1/codes
  POST - https://zk4bac5f0b.execute-api.us-east-1.amazonaws.com/dev/v1/urls/enqueue
functions:
  getUrl: serverless-url-shortener-dev-getUrl (86 kB)
  createCode: serverless-url-shortener-dev-createCode (86 kB)
  enqueueUrl: serverless-url-shortener-dev-enqueueUrl (78 kB)
  urls-queueWorker: serverless-url-shortener-dev-urls-queueWorker (86 kB)
urls-queue: https://sqs.us-east-1.amazonaws.com/account-id/serverless-url-shortener-dev-urls-queue
```

# CQRS Pattern

Pattern implemented within REST API.

https://apisix.apache.org/blog/2022/09/23/build-event-driven-api/

CQRS stands for `Command and Query Responsibility Segregation`, a pattern that separates reads and writes into different models, using commands to update data, and queries to read data.

`query` and `upsert` (updates or creates) responsibilities are split (segregated) into different services (e.g.: AWS Lambda Functions)

Technically, this can be implemented in HTTP so that the `Command API` is implemented exclusively with `POST routes`, while the `Query API` is implemented exclusively with `GET routes`.

<img src="https://github.com/juanroldan1989/terraform-url-shortener/raw/main/screenshots/url-shortener-infra-2.png" width="100%" />

For high number of `POST` requests, an improvement is to **decouple** `create` Lambda function from `DynamoDB` table by adding an `SQS Queue` **in between**.

`create` Lambda function **no longer writes** to `DynamoDB` table directly.

Instead:

1. `create` Lambda function sends `url` data into `create` SQS Queue as message.
2. SQS Queue message is picked up by `upsert` Lambda function.
3. `upsert` Lambda function persists record into `urls` DynamoDB Table:

# Naming conventions for files and functions

https://github.com/airbnb/javascript?tab=readme-ov-file#naming-conventions

# SQS Queue and DLQ setup

https://github.com/getlift/lift/blob/master/docs/queue.md
