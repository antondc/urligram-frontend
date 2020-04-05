import config from '../../../config.test.json';
import { urlBuild } from '../tools/utils/url';

export const API_DEVELOPMENT_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.API_DEVELOPMENT_PROTOCOL,
    host: config.API_DEVELOPMENT_HOST,
    port: config.API_DEVELOPMENT_PORT,
  })
);

export const API_PRODUCTION_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.API_PRODUCTION_PROTOCOL,
    host: config.API_PRODUCTION_HOST,
    port: config.API_PRODUCTION_PORT,
  })
);

export const SERVER_DEVELOPMENT_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.SERVER_DEVELOPMENT_PROTOCOL,
    host: config.SERVER_DEVELOPMENT_HOST,
    port: config.SERVER_DEVELOPMENT_PORT,
  })
);

export const SERVER_PRODUCTION_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.SERVER_PRODUCTION_PROTOCOL,
    host: config.SERVER_PRODUCTION_HOST,
    port: config.SERVER_PRODUCTION_PORT,
  })
);
