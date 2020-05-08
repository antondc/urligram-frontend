import merge from 'webpack-merge';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from '../config.test.json';
import webpackClientCommonConfig from './webpack.client.common';
import { API_DEVELOPMENT_ENDPOINT, SERVER_DEVELOPMENT_ENDPOINT, WEBPACK_ROOT, WEBPACK_SRC_CLIENT } from './constants';

const webpackClientDevConfig = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', WEBPACK_SRC_CLIENT],
  output: {
    filename: 'client-[hash:4].js',
    publicPath: WEBPACK_ROOT,
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
        use: ['style-loader', 'css-loader', 'less-loader'],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      isBrowser: true,
      'process.env': {
        PORT_SERVER: config.PORT_SERVER_DEVELOPMENT,
        PORT_API: config.PORT_API_DEVELOPMENT,
        ENDPOINT_API: API_DEVELOPMENT_ENDPOINT,
        ENDPOINT_SERVER: SERVER_DEVELOPMENT_ENDPOINT,
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
