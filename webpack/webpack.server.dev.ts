import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import config from '../config.test.json';
import CompressionPlugin from 'compression-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import {
  API_DEVELOPMENT_ENDPOINT,
  SERVER_DEVELOPMENT_ENDPOINT,
  WEBPACK_SRC_SERVER,
  WEBPACK_ROOT,
  WEBPACK_SRC,
  WEBPACK_DIST,
  WEBPACK_ASSETS,
} from './constants';

module.exports = {
  name: 'server',
  entry: [WEBPACK_SRC_SERVER],
  mode: 'development',
  context: WEBPACK_SRC,
  output: {
    filename: 'server.js',
    path: WEBPACK_DIST,
    libraryTarget: 'commonjs2',
    publicPath: WEBPACK_ROOT,
  },
  target: 'node',
  devtool: '#source-map',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      Root: path.resolve(WEBPACK_ROOT),
      Redux: path.resolve(WEBPACK_ROOT, 'src/shared/redux/'),
      Modules: path.resolve(WEBPACK_ROOT, 'src/shared/redux/modules/'),
      Common: path.resolve(WEBPACK_ROOT, 'src/shared/common/'),
      Components: path.resolve(WEBPACK_ROOT, 'src/shared/components/'),
      Assets: path.resolve(WEBPACK_ROOT, 'src/shared/assets/'),
      Routes: path.resolve(WEBPACK_ROOT, 'src/shared/routes/'),
      Tools: path.resolve(WEBPACK_ROOT, 'src/shared/tools/'),
      Services: path.resolve(WEBPACK_ROOT, 'src/shared/services/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: ['css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  // Messages on the console
  stats: 'errors-only',
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [
        path.join(WEBPACK_DIST, 'server*'),
        path.join(WEBPACK_DIST, 'img'),
        path.join(WEBPACK_DIST, 'svg'),
        path.join(WEBPACK_DIST, 'favicon'),
        path.join(WEBPACK_DIST, '*hot-update*'),
      ],
    }),
    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      isBrowser: false,
      'process.env': {
        PORT_SERVER: config.PORT_SERVER_DEVELOPMENT,
        PORT_API: config.PORT_API_DEVELOPMENT,
        ENDPOINT_API: API_DEVELOPMENT_ENDPOINT,
        ENDPOINT_SERVER: SERVER_DEVELOPMENT_ENDPOINT,
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.otf$|\.js$|\.css$|\.html$/,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(WEBPACK_ASSETS, 'img'),
        to: path.join(WEBPACK_DIST, 'img'),
      },
      {
        from: path.join(WEBPACK_ASSETS, 'svg'),
        to: path.join(WEBPACK_DIST, 'svg'),
      },
      {
        from: path.join(WEBPACK_ASSETS, 'favicon'),
        to: path.join(WEBPACK_DIST, 'favicon'),
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'server-report.html',
    }),
  ],
};
