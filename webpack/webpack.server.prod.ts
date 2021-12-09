import webpack from 'webpack';
import merge from 'webpack-merge';

import { production } from '../config.test.json';
import { ENVIRONMENT_PRODUCTION } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerProdConfig = {
  name: 'server',
  mode: 'production',
  target: 'node',
  devtool: 'none',
  stats: 'errors-only',
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      'process.env': {
        SECRET: JSON.stringify(process.env.SECRET),
        DOMAIN: JSON.stringify(production.DOMAIN),
        SERVER_PORT_HTTP: production.PORT_HTTP,
        SERVER_PORT_HTTPS: production.PORT_HTTPS,
        ENDPOINT_API: JSON.stringify(production.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_PRODUCTION),
      },
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
