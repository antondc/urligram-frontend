import merge from 'webpack-merge';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackClientCommonConfig from './webpack.client.common';
import { API_STAGING_ENDPOINT, WEBPACK_SRC_CLIENT, WEBPACK_DIST } from './constants';

const webpackClientProdConfig = {
  entry: [WEBPACK_SRC_CLIENT],
  mode: 'production',
  output: {
    filename: 'client-[hash:4].js',
    path: WEBPACK_DIST,
    publicPath: '/',
  },
  devtool: '#source-map',
  stats: 'detailed',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    ...webpackClientCommonConfig.plugins,
    new webpack.DefinePlugin({
      isBrowser: true,
      'process.env': {
        ENDPOINT_API: API_STAGING_ENDPOINT,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:4].css',
      chunkFilename: '[name]-[hash:4].css',
    }),
  ],
};

export default merge(webpackClientProdConfig, webpackClientCommonConfig);
