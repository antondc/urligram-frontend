import merge from 'webpack-merge';
import webpack from 'webpack';
import webpackServerCommonConfig from './webpack.server.common';
import { API_STAGING_ENDPOINT } from './constants';
import { SERVER_PRODUCTION_PORT } from '../config.test.json';

const webpackServerProdConfig = {
  name: 'server',
  mode: 'production',
  target: 'node',
  devtool: '#source-map',
  stats: 'errors-only',
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      isBrowser: false,
      'process.env': {
        SERVER_PORT: SERVER_PRODUCTION_PORT,
        ENDPOINT_API: API_STAGING_ENDPOINT,
      },
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
