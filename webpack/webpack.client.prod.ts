import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';

import Config from '../config.test.json';
import { APP_ENVIRONMENT_DEPLOY, NODE_ENV_PRODUCTION, WEBPACK_DIST, WEBPACK_SRC_CLIENT } from './constants';
import webpackClientCommonConfig from './webpack.client.common';

const webpackClientProdConfig: Configuration = {
  entry: [WEBPACK_SRC_CLIENT],
  mode: NODE_ENV_PRODUCTION,
  output: {
    filename: 'client-[fullhash:4].js',
    path: WEBPACK_DIST,
    publicPath: '/',
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DOMAIN': JSON.stringify(Config.deployProduction.DOMAIN),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.APP_ENV': JSON.stringify(APP_ENVIRONMENT_DEPLOY),
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[fullhash:4].css',
      chunkFilename: '[name]-[fullhash:4].css',
    }),
  ],
};

export default merge(webpackClientProdConfig, webpackClientCommonConfig);
