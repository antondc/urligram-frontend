import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';

import { development } from '../config.test.json';
import { ENVIRONMENT_DEV } from './constants';
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
      'process.env': {
        SECRET: JSON.stringify(process.env.SECRET),
        DOMAIN: JSON.stringify(development.DOMAIN),
        SERVER_PORT_HTTP: development.PORT_HTTP,
        SERVER_PORT_HTTPS: development.PORT_HTTPS,
        ENDPOINT_API: JSON.stringify(development.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_DEV),
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
