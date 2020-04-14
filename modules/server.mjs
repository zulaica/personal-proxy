import { createServer } from 'http';
import { get } from 'https';
import { readFile } from 'fs';
import { stringify } from 'querystring';
import CREDENTIALS from './credentials.mjs';

const {
  instagram: { access_token, fields, instagramUserId },
} = CREDENTIALS;
const instagramQuery = stringify({ fields, limit: 1, access_token });

const server = createServer((request, response) => {
  const sendResponse = (statusCode, contentType, payload) => {
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.write(payload);
    response.end();
  };

  switch (request.url) {
    case '/favicon.ico':
      readFile('./favicon.ico', (_error, data) => {
        sendResponse(200, 'image/x-icon', data);
      });
      break;
    case '/instagram':
      get(
        `https://graph.instagram.com/${instagramUserId}/media/?${instagramQuery}`,
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
    case '/spotify':
      break;
    default:
      readFile('403.html', (_error, data) => {
        sendResponse(403, 'text/html', data);
      });
      break;
  }
});

export default server;
