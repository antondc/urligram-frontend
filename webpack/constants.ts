import path from 'path';

export const WEBPACK_ROOT = path.resolve(process.cwd());
export const WEBPACK_BUILD = path.resolve(process.cwd(), 'webpack');
export const WEBPACK_DIST = path.resolve(process.cwd(), 'dist');
export const WEBPACK_SRC = path.resolve(process.cwd(), 'src');
export const WEBPACK_SRC_CLIENT = path.resolve(process.cwd(), 'src', 'client', 'App.tsx');
export const WEBPACK_SRC_SERVER = path.resolve(process.cwd(), 'src', 'server', 'App.ts');
export const WEBPACK_ASSETS = path.resolve(process.cwd(), 'src', 'shared', 'assets');
export const ENVIRONMENT_DEV = 'dev';
export const ENVIRONMENT_STAGING = 'staging';
export const ENVIRONMENT_PRODUCTION = 'production';
