import webpack from 'webpack';
import merge from 'webpack-merge';

import { SERVER_PRODUCTION_PORT } from '../config.test.json';
import { API_PRODUCTION_ENDPOINT } from './constants';
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
        SERVER_PORT: SERVER_PRODUCTION_PORT,
        ENDPOINT_API: API_PRODUCTION_ENDPOINT,
      },
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
