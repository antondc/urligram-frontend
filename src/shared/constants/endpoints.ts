import config from '../../../config.test.json';
import { buildEndpoint } from '../tools/utils/url';

export const API_DEVELOPMENT_ENDPOINT = buildEndpoint(
  config.API_DEVELOPMENT_PROTOCOL,
  config.API_DEVELOPMENT_HOST,
  config.API_DEVELOPMENT_PORT
);

export const API_PRODUCTION_ENDPOINT = buildEndpoint(
  config.API_PRODUCTION_PROTOCOL,
  config.API_PRODUCTION_HOST,
  config.API_PRODUCTION_PORT
);

export const SERVER_DEVELOPMENT_ENDPOINT = buildEndpoint(
  config.SERVER_DEVELOPMENT_PROTOCOL,
  config.SERVER_DEVELOPMENT_HOST,
  config.SERVER_DEVELOPMENT_PORT
);

export const SERVER_PRODUCTION_ENDPOINT = buildEndpoint(
  config.SERVER_PRODUCTION_PROTOCOL,
  config.SERVER_PRODUCTION_HOST,
  config.SERVER_PRODUCTION_PORT
);
