import merge from 'webpack-merge';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from '../config.test.json';
import webpackServerCommonConfig from './webpack.server.common';
import { API_DEVELOPMENT_ENDPOINT, SERVER_DEVELOPMENT_ENDPOINT } from './constants';

const webpackServerProdConfig = {
  name: 'server',
  mode: 'development',
  target: 'node',
  devtool: '#source-map',
  stats: 'errors-only',
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      isBrowser: false,
      'process.env': {
        PORT_SERVER: config.PORT_SERVER_DEVELOPMENT,
        PORT_API: config.PORT_API_DEVELOPMENT,
        ENDPOINT_API: API_DEVELOPMENT_ENDPOINT,
        ENDPOINT_SERVER: SERVER_DEVELOPMENT_ENDPOINT,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'server-report.html',
    }),
  ],
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
