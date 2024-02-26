# Serverless URL Shortener

<img src="https://github.com/juanroldan1989/terraform-url-shortener/raw/main/screenshots/url-shortener-infra-1.png" width="100%" />

1. [Core Features](#core-features)

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
$ curl -H "x-api-key: <api-key>" \
  https://<api-gateway-id>.execute-api.<aws-region>.amazonaws.com/dev/v1/urls/<code>
```
