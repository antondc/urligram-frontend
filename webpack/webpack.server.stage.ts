import webpack from 'webpack';
import merge from 'webpack-merge';

import { staging } from '../config.test.json';
import { ENVIRONMENT_STAGING } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerProdConfig = {
  name: 'server',
  mode: 'production',
  target: 'node',
  devtool: '#source-map',
  stats: 'errors-only',
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      'process.env': {
        SECRET: JSON.stringify(process.env.SECRET),
        DOMAIN: JSON.stringify(staging.DOMAIN),
        SERVER_PORT_HTTP: staging.PORT_HTTP,
        SERVER_PORT_HTTPS: staging.PORT_HTTPS,
        ENDPOINT_API: JSON.stringify(staging.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_STAGING),
      },
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
