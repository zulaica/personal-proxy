import ENV_VARS from './envVars.mjs';

const loadEnvVars = () =>
  Object.assign(process.env, {
    ACCESS_DOMAIN: ENV_VARS.accessDomain,
    INSTAGRAM_ACCESS_TOKEN: ENV_VARS.instagram.accessToken,
    INSTAGRAM_FIELDS: ENV_VARS.instagram.fields,
    INSTAGRAM_USER_ID: ENV_VARS.instagram.userId,
    LASTFM_API_KEY: ENV_VARS.lastfm.apiKey,
    LASTFM_FORMAT: ENV_VARS.lastfm.format,
    LASTFM_METHOD: ENV_VARS.lastfm.method,
    LASTFM_USER: ENV_VARS.lastfm.user
  });

export default loadEnvVars;
