import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

import { WEBPACK_ASSETS, WEBPACK_DIST, WEBPACK_ROOT, WEBPACK_SRC, WEBPACK_SRC_SERVER } from './constants';

const webpackServerCommonConfig: Configuration = {
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
      Hooks: path.resolve(WEBPACK_ROOT, 'src/shared/hooks/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'ts-loader',
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
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.otf$|\.js$|\.css$|\.html$/,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(WEBPACK_ASSETS, 'images'),
          to: path.join(WEBPACK_DIST, 'img'),
        },
        {
          from: path.join(WEBPACK_ASSETS, 'svg'),
          to: path.join(WEBPACK_DIST, 'svg'),
        },
        {
          from: path.join(WEBPACK_ASSETS, 'favicons'),
          to: path.join(WEBPACK_DIST, 'favicon'),
        },
      ],
    }),
  ],
};

export default webpackServerCommonConfig;
