import { createServer } from "http";
import { get } from "https";
import { readFile } from "fs";
import { stringify } from "querystring";
import loadEnvVars from "./loadEnvVars.mjs";

process.env.NODE_ENV !== "production" && loadEnvVars();

const {
  env: {
    ACCESS_DOMAIN,
    INSTAGRAM_ACCESS_TOKEN,
    INSTAGRAM_FIELDS,
    INSTAGRAM_USER_ID
  }
} = process;

const query = stringify({
  fields: INSTAGRAM_FIELDS,
  limit: 1,
  access_token: INSTAGRAM_ACCESS_TOKEN
});

const server = createServer((request, response) => {
  const sendResponse = (statusCode, contentType, payload) => {
    response.setHeader("Access-Control-Allow-Origin", ACCESS_DOMAIN);
    response.setHeader("Access-Control-Allow-Methods", "GET");
    response.writeHead(statusCode, { "Content-Type": contentType });
    response.write(payload);
    response.end();
  };

  const requestForbidden = () =>
    readFile("403.html", (_error, data) =>
      sendResponse(403, "text/html", data)
    );

  if (
    request.method !== "GET" ||
    request.headers.referer !== `${ACCESS_DOMAIN}/`
  )
    return requestForbidden();

  switch (request.url) {
    case "/favicon.ico":
      readFile("./favicon.ico", (_error, data) => {
        sendResponse(200, "image/x-icon", data);
      });
      break;
    case "/instagram":
      get(
        `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media/?${query}`,
        proxy => {
          let data = "";

          proxy.on("data", chunk => {
            data += chunk;
          });

          proxy.on("end", () => {
            sendResponse(200, "application/json", data);
          });
        }
      );
      break;
    default:
      requestForbidden();
      break;
  }
});

export default server;
