import config from 'Root/config.test.json';

export const SECRET = config[process.env.NODE_ENV].SECRET;
export const DOMAIN = config[process.env.NODE_ENV].DOMAIN;
