import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';

import Config from '../config.test.json';
import { ENVIRONMENT_PRODUCTION } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerProdConfig: Configuration = {
  name: 'server',
  mode: 'production',
  target: 'node',
  stats: 'errors-only',
  output: {
    clean: true,
  },
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      'process.env': {
        JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
        DOMAIN: JSON.stringify(Config.production.DOMAIN),
        SERVER_PORT_HTTP: Config.production.PORT_HTTP,
        SERVER_PORT_HTTPS: Config.production.PORT_HTTPS,
        ENDPOINT_API: JSON.stringify(Config.production.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_PRODUCTION),
      },
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
