# Serverless URL Shortener

<img src="https://github.com/juanroldan1989/terraform-url-shortener/raw/main/screenshots/url-shortener-infra-1.png" width="100%" />

1. [Core Features](#core-features)

# Core Features

1. Ability to submit URL `https://really-awesome-long-url.com` to API (`POST request`):

```ruby
% curl -X POST \
-H "Content-Type: application/json" \
-d '{"url": "https://this-is-my-sample-original-url"}' \
https://<api-gateway-id>.execute-api.<region>.amazonaws.com/v1/urls
```

Response:

```
{ "code" : "736339761" }
```

2. `code` can then be used to build `https://<api-gateway-id>.execute-api.<region>.amazonaws.com/v1/urls/{code}` and should return original URL `https://really-awesome-long-url.com` (`GET request`):

```ruby
% curl https://<api-gateway-id>.execute-api.<region>.amazonaws.com/v1/urls/736339761
```

Response:

```
https://this-is-my-original-url
```

# API Keys

Generating **code** for shortened URL (`/codes` endpoint):

```ruby
$ curl -X POST -H "Content-Type: application/json" -H "x-api-key: <api-key>" -d '{"url": "https://really-long-url.com"}' https://<api-gateway-id>.execute-api.<aws-region>.amazonaws.com/dev/v1/codes
```

Retrieving **url** data based on code (`/urls` endpoint):

```ruby
$ curl -H "x-api-key: <api-key>" https://<api-gateway-id>.execute-api.<aws-region>.amazonaws.com/dev/v1/urls/<code>
```
