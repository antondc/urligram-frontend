import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';

import { SERVER_DEVELOPMENT_PORT } from '../config.test.json';
import { API_STAGING_ENDPOINT } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerDevConfig = {
  name: 'server',
  mode: 'development',
  target: 'node',
  devtool: '#source-map',
  stats: 'normal',
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      isBrowser: false,
      'process.env': {
        SERVER_PORT: SERVER_DEVELOPMENT_PORT,
        ENDPOINT_API: API_STAGING_ENDPOINT,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'server-report.html',
    }),
  ],
};

export default merge(webpackServerDevConfig, webpackServerCommonConfig);
