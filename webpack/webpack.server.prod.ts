import { Configuration } from 'webpack';
import merge from 'webpack-merge';

import { NODE_ENV_PRODUCTION } from './constants';
import webpackServerCommonConfig from './webpack.server.common';

const webpackServerProdConfig: Configuration = {
  name: 'server',
  mode: NODE_ENV_PRODUCTION,
  target: 'node',
  stats: 'errors-only',
  output: {
    clean: true,
  },
};

export default merge(webpackServerProdConfig, webpackServerCommonConfig);
