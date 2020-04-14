# Personal Proxy

A simple NodeJS proxy for my personal website built to keep third-party API
secrets both secret and safe.

**This is still very much a work-in-progress.**

It currently proxies calls to Instagram's API with plans to support Spotify.

## Questions

> Why didn't you _just_ use **THING-THAT-SOLVES-THIS-PROBLEM** to do this?

Because I didn't want to. This is primarily a learning experience for myself.

# Requirements

[NodeJS](https://nodejs.org/) v13 (v14 LTS when it is released)

# Prerequesites

Until environment variables are supported, you will need a
`./modules/credentials.mjs` file containing the appropriate IDs, tokens, and
other params necessary to communicate with the supported third-party APIs.

```./modules/credentails.mjs
const CREDENTIALS = Object.freeze({
  instagram: {
    access_token:
      'YOUR-ACCESS-TOKEN',
    fields: 'id,caption,media_type,media_url,thumbnail_url,timestamp',
    instagramUserId: YOUR-USER-ID,
  },
});

export default CREDENTIALS;
```

# Usage

`cd` into the root directory of this repository and launch the index script
using node.

```
$ node index.mjs
```

The server will be available at `http://127.0.0.1:3001`, with the Instagram API
accessible from `http://127.0.0.1:3001/instagram`. The IP address and port can
be configured differently by changing the values in `./modules/config.mjs`.
