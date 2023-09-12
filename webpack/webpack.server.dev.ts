import webpack, { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';

import Config from '../config.test.json';
import { ENVIRONMENT_DEV } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerDevConfig: Configuration = {
  name: 'server',
  mode: 'development',
  target: 'node',
  devtool: 'eval-cheap-module-source-map',
  stats: 'normal',
  output: {
    clean: {
      keep: (asset) =>
        asset.includes('favicon') || asset.includes('img') || asset.includes('fonts') || asset.includes('svg'),
    },
  },
  plugins: [
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      'process.env': {
        JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
        DOMAIN: JSON.stringify(Config.development.DOMAIN),
        SERVER_PORT_HTTP: Config.development.PORT_HTTP,
        SERVER_PORT_HTTPS: Config.development.PORT_HTTPS,
        ENDPOINT_API: JSON.stringify(Config.development.API_URL),
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
