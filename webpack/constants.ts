import path from 'path';

import config from '../config.test.json';
import urlBuild from '../src/shared/tools/utils/url/urlBuild';

export const WEBPACK_ROOT = path.resolve(process.cwd());
export const WEBPACK_BUILD = path.resolve(process.cwd(), 'webpack');
export const WEBPACK_DIST = path.resolve(process.cwd(), 'dist');
export const WEBPACK_SRC = path.resolve(process.cwd(), 'src');
export const WEBPACK_SRC_CLIENT = path.resolve(process.cwd(), 'src', 'client', 'App.tsx');
export const WEBPACK_SRC_SERVER = path.resolve(process.cwd(), 'src', 'server', 'App.ts');
export const WEBPACK_ASSETS = path.resolve(process.cwd(), 'src', 'shared', 'assets');

export const API_LOCAL_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.development.API_PROTOCOL,
    host: config.development.API_HOST,
    port: config.development.API_PORT,
    path: config.development.API_PATH,
  })
);

export const API_STAGING_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.staging.API_PROTOCOL,
    host: config.staging.API_HOST,
    path: config.staging.API_PATH,
  })
);

export const API_PRODUCTION_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.production.API_PROTOCOL,
    host: config.production.API_HOST,
    path: config.production.API_PATH,
  })
);
