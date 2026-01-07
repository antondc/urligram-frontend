import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';

import { NODE_ENV_DEVELOPMENT } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerDevConfig: Configuration = {
  name: 'server',
  mode: NODE_ENV_DEVELOPMENT,
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'server-report.html',
    }),
  ],
};

export default merge(webpackServerDevConfig, webpackServerCommonConfig);
