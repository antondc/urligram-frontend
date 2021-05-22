import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';

import { WEBPACK_DIST, WEBPACK_ROOT, WEBPACK_SRC } from './constants';

const webpackClientCommonConfig = {
  name: 'client',
  context: WEBPACK_SRC,
  target: 'web',
  externals: {},
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
      Vendor: path.resolve(WEBPACK_ROOT, 'src/shared/vendor/'),
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
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[path][name].[ext]',
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
        path.join(WEBPACK_DIST, 'main-*'),
        path.join(WEBPACK_DIST, 'client-*'),
        path.join(WEBPACK_DIST, '*hot-update*'),
      ],
      cleanAfterEveryBuildPatterns: [],
    }),
    new HtmlWebPackPlugin({
      baseUrl: '',
      inject: true,
      template: path.join(WEBPACK_SRC, 'client/App.ejs'),
      filename: path.join(WEBPACK_DIST, '/popup.html'),
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.otf$|\.js$|\.css$|\.html$/,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(WEBPACK_ROOT, 'manifest.json'),
        to: path.join(WEBPACK_DIST, 'manifest.json'),
      },
      {
        from: path.join(WEBPACK_ROOT, 'background.js'),
        to: path.join(WEBPACK_DIST, 'background.js'),
      },
      {
        from: path.join(WEBPACK_SRC, 'shared', 'assets', 'img'),
        to: path.join(WEBPACK_DIST, 'img'),
      },
      {
        from: path.join(WEBPACK_SRC, 'shared', 'assets', 'svg'),
        to: path.join(WEBPACK_DIST, 'svg'),
      },
    ]),
  ],
};

export default webpackClientCommonConfig;
