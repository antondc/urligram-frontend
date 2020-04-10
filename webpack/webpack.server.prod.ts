import merge from 'webpack-merge';
const webpackServerDevConfig = require('./webpack.server.dev.ts');

const webpackServerProdConfig = {
  mode: 'production',
  devtool: 'none',
  stats: 'detailed',
  plugins: [...webpackServerDevConfig.plugins],
};

module.exports = merge(webpackServerDevConfig, webpackServerProdConfig);
