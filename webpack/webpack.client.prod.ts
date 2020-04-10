import merge from 'webpack-merge';
const webpackClientDevConfig = require('./webpack.client.dev.ts');
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackClientProdConfig = {
  mode: 'production',
  devtool: 'none',
  stats: 'detailed',
  plugins: [
    ...webpackClientDevConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:4].css',
      chunkFilename: '[name]-[hash:4].css',
    }),
  ],
};

module.exports = merge(webpackClientDevConfig, webpackClientProdConfig);
