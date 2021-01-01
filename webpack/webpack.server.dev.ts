import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';

import { development } from '../config.test.json';
import { API_LOCAL_ENDPOINT } from './constants';
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
        SERVER_PORT_HTTP: development.PORT_HTTP,
        SERVER_PORT_HTTPS: development.PORT_HTTPS,
        ENDPOINT_API: API_LOCAL_ENDPOINT,
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
