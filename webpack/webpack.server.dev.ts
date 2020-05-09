import merge from 'webpack-merge';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpackServerCommonConfig from './webpack.server.common';
import { API_DEVELOPMENT_ENDPOINT } from './constants';
import { SERVER_DEVELOPMENT_PORT } from '../config.test.json';

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
        ENDPOINT_API: API_DEVELOPMENT_ENDPOINT,
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
