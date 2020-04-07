import HtmlWebPackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import config from './config.test.json';
import CompressionPlugin from 'compression-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { API_DEVELOPMENT_ENDPOINT, SERVER_DEVELOPMENT_ENDPOINT } from './src/shared/constants/endpoints';

module.exports = {
  name: 'client',
  entry: ['webpack-hot-middleware/client?reload=true', '../src/client/App.tsx'],
  context: __dirname,
  mode: 'development',
  target: 'web',
  output: {
    filename: 'client-[hash:4].js',
    publicPath: '/',
  },
  devtool: '#source-map',
  externals: {},
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.ts'],
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
      },
    ],
  },
  stats: 'verbose',
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['./client-*.js', './client-*.js.map', './client-*.js.gz'],
      cleanAfterEveryBuildPatterns: [
        '*.hot-update.json',
        '*.hot-update.js',
        '*.hot-update.js.gz',
        '*.hot-update.js.map',
      ],
    }),
    new HtmlWebPackPlugin({
      baseUrl: '',
      inject: true,
      template: './../src/server/views/indexBase.ejs',
      filename: '../src/server/views/index.ejs',
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
      reportFilename: 'webpack-report.html',
    }),
  ],
};
