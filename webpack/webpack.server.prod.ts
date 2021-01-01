import webpack from 'webpack';
import merge from 'webpack-merge';

import { production } from '../config.test.json';
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
      isBrowser: false,
      'process.env': {
        SERVER_PORT_HTTP: production.PORT_HTTP,
        SERVER_PORT_HTTPS: production.PORT_HTTPS,
        ENDPOINT_API: JSON.stringify(production.API_URL),
      },
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
