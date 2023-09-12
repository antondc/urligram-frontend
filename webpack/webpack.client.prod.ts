import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';

import Config from '../config.test.json';
import { ENVIRONMENT_PRODUCTION, WEBPACK_DIST, WEBPACK_SRC_CLIENT } from './constants';
import webpackClientCommonConfig from './webpack.client.common';

const webpackClientProdConfig: Configuration = {
  entry: [WEBPACK_SRC_CLIENT],
  mode: 'production',
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
      'process.env': {
        DOMAIN: JSON.stringify(Config.production.DOMAIN),
        ENDPOINT_API: JSON.stringify(Config.production.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_PRODUCTION),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[fullhash:4].css',
      chunkFilename: '[name]-[fullhash:4].css',
    }),
  ],
};

export default merge(webpackClientProdConfig, webpackClientCommonConfig);
