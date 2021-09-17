import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

import { WEBPACK_ASSETS, WEBPACK_DIST, WEBPACK_ROOT, WEBPACK_SRC, WEBPACK_SRC_SERVER } from './constants';

const webpackServerCommonConfig = {
  name: 'server',
  entry: [WEBPACK_SRC_SERVER],
  context: WEBPACK_SRC,
  output: {
    filename: 'server.js',
    path: WEBPACK_DIST,
    libraryTarget: 'commonjs2',
    publicPath: WEBPACK_ROOT,
  },
  target: 'node',
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
      Router: path.resolve(WEBPACK_ROOT, 'src/shared/router/'),
      Tools: path.resolve(WEBPACK_ROOT, 'src/shared/tools/'),
      Services: path.resolve(WEBPACK_ROOT, 'src/shared/services/'),
      Ui: path.resolve(WEBPACK_ROOT, 'src/shared/ui/'),
      Pages: path.resolve(WEBPACK_ROOT, 'src/shared/pages/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: ['css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          publicPath: '/fonts',
          name: '[name].[ext]',
        },
      },
    ],
  },
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
  ],
};

export default webpackServerCommonConfig;
