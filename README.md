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
