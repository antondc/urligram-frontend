import webpack, { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';

import Config from '../config.test.json';
import { ENVIRONMENT_DEV, WEBPACK_ROOT, WEBPACK_SRC_CLIENT } from './constants';
import webpackClientCommonConfig from './webpack.client.common';

const webpackClientDevConfig: Configuration = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client', WEBPACK_SRC_CLIENT],
  output: {
    filename: 'client-[fullhash:4].js',
    publicPath: WEBPACK_ROOT,
    libraryTarget: 'umd',
  },
  devtool: 'eval-cheap-module-source-map',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        DOMAIN: JSON.stringify(Config.development.DOMAIN),
        ENDPOINT_API: JSON.stringify(Config.development.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_DEV),
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
