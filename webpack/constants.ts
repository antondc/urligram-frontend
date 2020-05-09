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

export const API_DEVELOPMENT_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.API_DEVELOPMENT_PROTOCOL,
    host: config.API_DEVELOPMENT_HOST,
    port: config.API_DEVELOPMENT_PORT,
    path: config.API_DEVELOPMENT_PATH,
  })
);

export const API_STAGING_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.API_STAGING_PROTOCOL,
    host: config.API_STAGING_HOST,
    port: config.API_STAGING_PORT,
    path: config.API_STAGING_PATH,
  })
);

export const API_PRODUCTION_ENDPOINT = JSON.stringify(
  urlBuild({
    protocol: config.API_PRODUCTION_PROTOCOL,
    host: config.API_PRODUCTION_HOST,
    path: config.API_PRODUCTION_PATH,
  })
);
