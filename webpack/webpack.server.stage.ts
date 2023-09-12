import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';

import Config from '../config.test.json';
import { ENVIRONMENT_STAGING } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerProdConfig: Configuration = {
  name: 'server',
  mode: 'production',
  target: 'node',
  devtool: 'eval-cheap-module-source-map',
  stats: 'errors-only',
  output: {
    clean: true,
  },
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      'process.env': {
        JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
        DOMAIN: JSON.stringify(Config.staging.DOMAIN),
        SERVER_PORT_HTTP: Config.staging.PORT_HTTP,
        SERVER_PORT_HTTPS: Config.staging.PORT_HTTPS,
        ENDPOINT_API: JSON.stringify(Config.staging.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_STAGING),
      },
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
