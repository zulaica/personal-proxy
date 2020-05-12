import CREDENTIALS from "./credentials.mjs";

const loadVars = () =>
  Object.assign(process.env, {
    INSTAGRAM_ACCESS_TOKEN: CREDENTIALS.instagram.accessToken,
    INSTAGRAM_FIELDS: CREDENTIALS.instagram.fields,
    INSTAGRAM_USER_ID: CREDENTIALS.instagram.userId
  });

export default loadVars;
