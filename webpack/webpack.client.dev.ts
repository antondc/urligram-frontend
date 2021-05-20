import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';

import { development } from '../config.test.json';
import { WEBPACK_DIST, WEBPACK_SRC_CLIENT } from './constants';
import webpackClientCommonConfig from './webpack.client.common';

const webpackClientDevConfig = {
  mode: 'development',
  entry: [WEBPACK_SRC_CLIENT],
  output: {
    filename: 'client-[hash:4].js',
    path: WEBPACK_DIST,
  },
  devtool: '#source-map',
  stats: 'normal',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    ...webpackClientCommonConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        ENDPOINT_API: JSON.stringify(development.API_URL),
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'client-report.html',
    }),
  ],
};

export default merge(webpackClientDevConfig, webpackClientCommonConfig);
