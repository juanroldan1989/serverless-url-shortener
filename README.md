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
```

- Retrieve **url** based on code (`/urls` endpoint):

```ruby
$ curl https://<api-gateway-id>.execute-api.<aws-region>.amazonaws.com/dev/v1/urls/<code>
```

# Naming conventions for files and functions

https://github.com/airbnb/javascript?tab=readme-ov-file#naming-conventions

# Deployment

1. Clone repository.

2. Install serverless framework.

3. CD into project folder:

```ruby
$ sls deploy

Deploying serverless-url-shortener to stage dev (us-east-1)

✔ Service deployed to stack serverless-url-shortener-dev (73s)

api keys:
  dev-BasicPlanKey: xxxx (auto-generated value at deployment time)
  dev-FreePlanKey: yyyy (auto-generated value at deployment time)
  dev-PremiumPlanKey: zzzz (auto-generated value at deployment time)
endpoints:
  GET - https://gjvvigycif.execute-api.us-east-1.amazonaws.com/dev/v1/urls/{id}
  POST - https://gjvvigycif.execute-api.us-east-1.amazonaws.com/dev/v1/codes
functions:
  getUrl: serverless-url-shortener-dev-getUrl (86 kB)
  createCode: serverless-url-shortener-dev-createCode (86 kB)
```
