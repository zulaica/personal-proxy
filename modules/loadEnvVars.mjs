import ENV_VARS from "./envVars.mjs";

const loadEnvVars = () =>
  Object.assign(process.env, {
    ACCESS_DOMAIN: ENV_VARS.accessDomain,
    INSTAGRAM_ACCESS_TOKEN: ENV_VARS.instagram.accessToken,
    INSTAGRAM_FIELDS: ENV_VARS.instagram.fields,
    INSTAGRAM_USER_ID: ENV_VARS.instagram.userId
  });

export default loadEnvVars;
