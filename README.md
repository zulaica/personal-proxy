# Personal Proxy

A simple NodeJS proxy for my personal website built to keep third-party API
secrets both secret and safe.

**This is still very much a work-in-progress.**

It currently proxies calls to Instagram's API with plans to support other
services.

## Questions

> Why didn't you _just_ use **THING-THAT-SOLVES-THIS-PROBLEM** to do this?

Because I didn't want to. This is primarily a learning experience for myself.

# Requirements

[NodeJS](https://nodejs.org/) (Version 16 LTS)

# Prerequisites

The following environment variables will need to be assigned the appropriate
values:

```
ACCESS_DOMAIN
INSTAGRAM_ACCESS_TOKEN
INSTAGRAM_FIELDS
INSTAGRAM_USER_ID
NODE_ENV
```

For local development, these can be set up in a module located at
`./modules/envVars.mjs`. This file should contain the appropriate access domain,
IDs, tokens, and other params necessary to communicate with the supported
third-party APIs. `NODE_ENV` is only required on a production server with its
value set to `production`.

```./modules/envVars.mjs
const ENV_VARS = Object.freeze({
  accessDomain: "http://LOCAL-ACCESS-DOMAIN:OPTIONAL-PORT",
  instagram: {
    accessToken: "YOUR-ACCESS-TOKEN",
    fields: "id,caption,media_type,media_url,thumbnail_url,timestamp",
    userId: YOUR-USER-ID
  }
});

export default ENV_VARS;
```

# Usage

Launch the index script using node.

```
$ node index.mjs
```

The server will be running at `http://127.0.0.1:3001` with the Instagram API
accessible from `http://127.0.0.1:3001/instagram`. The IP address and port can
be configured differently by changing the values in `./modules/config.mjs`.

Access to the API is restricted both by `CORS` and `referer` validation.
