import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';

import { production } from '../config.test.json';
import { ENVIRONMENT_PRODUCTION, WEBPACK_DIST, WEBPACK_SRC_CLIENT } from './constants';
import webpackClientCommonConfig from './webpack.client.common';

const webpackClientProdConfig = {
  entry: [WEBPACK_SRC_CLIENT],
  mode: 'production',
  output: {
    filename: 'client-[hash:4].js',
    path: WEBPACK_DIST,
    publicPath: '/',
  },
  devtool: 'none',
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
    ...webpackClientCommonConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        DOMAIN: JSON.stringify(production.DOMAIN),
        ENDPOINT_API: JSON.stringify(production.API_URL),
        ENVIRONMENT: JSON.stringify(ENVIRONMENT_PRODUCTION),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:4].css',
      chunkFilename: '[name]-[hash:4].css',
    }),
  ],
};

export default merge(webpackClientProdConfig, webpackClientCommonConfig);
