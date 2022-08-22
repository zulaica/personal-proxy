import { createServer } from 'http';
import { get } from 'https';
import { readFile } from 'fs';
import { stringify } from 'querystring';

if (process.env.NODE_ENV !== 'production') {
  await import('./loadEnvVars.mjs').then(({ default: loadEnvVars }) =>
    loadEnvVars()
  );
}

const {
  env: {
    ALLOWED_DOMAINS,
    INSTAGRAM_ACCESS_TOKEN,
    INSTAGRAM_FIELDS,
    INSTAGRAM_USER_ID,
    LASTFM_API_KEY,
    LASTFM_FORMAT,
    LASTFM_METHOD,
    LASTFM_USER
  }
} = process;

const allowedDomains = ALLOWED_DOMAINS.split(',');

const instagramQuery = stringify({
  fields: INSTAGRAM_FIELDS,
  limit: 1,
  access_token: INSTAGRAM_ACCESS_TOKEN
});

const lastfmQuery = stringify({
  api_key: LASTFM_API_KEY,
  format: LASTFM_FORMAT,
  limit: 1,
  method: LASTFM_METHOD,
  user: LASTFM_USER
});

const server = createServer((request, response) => {
  const sendResponse = (statusCode, contentType, payload) => {
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.write(payload);
    response.end();
  };

  const requestForbidden = () =>
    readFile('403.html', (_error, data) =>
      sendResponse(403, 'text/html', data)
    );

  if (
    request.method !== 'GET' ||
    !allowedDomains.includes(request.headers.origin)
  )
    return requestForbidden();

  switch (request.url) {
    case '/favicon.ico':
      readFile('./favicon.ico', (_error, data) => {
        sendResponse(200, 'image/x-icon', data);
      });
      break;
    case '/instagram':
      get(
        `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media/?${instagramQuery}`,
        (proxy) => {
          let data = '';

          proxy.on('data', (chunk) => {
            data += chunk;
          });

          proxy.on('end', () => {
            sendResponse(200, 'application/json', data);
          });
        }
      );
      break;
    case '/lastfm':
      get(`https://ws.audioscrobbler.com/2.0/?${lastfmQuery}`, (proxy) => {
        let data = '';

        proxy.on('data', (chunk) => {
          data += chunk;
        });

        proxy.on('end', () => {
          sendResponse(200, 'application/json', data);
        });
      });
      break;
    default:
      requestForbidden();
      break;
  }
});

export default server;
