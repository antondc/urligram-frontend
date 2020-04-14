import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import config from '../config.test.json';
import CompressionPlugin from 'compression-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {
  API_DEVELOPMENT_ENDPOINT,
  SERVER_DEVELOPMENT_ENDPOINT,
  WEBPACK_SRC_CLIENT,
  WEBPACK_ROOT,
  WEBPACK_SRC,
  WEBPACK_DIST,
} from './constants';

module.exports = {
  name: 'client',
  entry: ['webpack-hot-middleware/client?reload=true', WEBPACK_SRC_CLIENT],
  context: WEBPACK_SRC,
  mode: 'development',
  target: 'web',
  output: {
    filename: 'client-[hash:4].js',
    publicPath: WEBPACK_ROOT,
  },
  devtool: '#source-map',
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
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  stats: 'errors-only',
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.join(WEBPACK_DIST, 'client-*'), path.join(WEBPACK_DIST, '*hot-update*')],
      cleanAfterEveryBuildPatterns: [],
    }),
    new HtmlWebPackPlugin({
      baseUrl: '',
      inject: true,
      template: path.join(WEBPACK_SRC, 'server/views/indexBase.ejs'),
      filename: path.join(WEBPACK_SRC, 'server/views/index.ejs'),
      toHtml: '<%- toHtml %>',
      toHead: '<%- toHead %>',
      deviceDetector:
        '<% if (isDesktop) { %>isDesktop<% } else if (isTablet) { %>isTablet<% } else if (isMobile) { %>isMobile<% } %> <%- browser %> <% if (isBot) { %>isBot<% } %>',
      body: '<%- body %>',
      data: '<%- data %>',
    }),

    new webpack.DefinePlugin({
      isBrowser: true,
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'client-report.html',
    }),
  ],
};
