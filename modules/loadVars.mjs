import CREDENTIALS, { PROD, DEV } from "./credentials.mjs";

const loadVars = () =>
  Object.assign(process.env, {
    INSTAGRAM_ACCESS_TOKEN: CREDENTIALS.instagram.accessToken,
    INSTAGRAM_FIELDS: CREDENTIALS.instagram.fields,
    INSTAGRAM_USER_ID: CREDENTIALS.instagram.userId
  });

export const loadProdVars = () => {
  Object.assign(process.env, {
    ACCESS_DOMAIN: PROD.accessDomain
  });
};

export const loadDevVars = () => {
  Object.assign(process.env, {
    ACCESS_DOMAIN: DEV.accessDomain
  });
};

export default loadVars;
