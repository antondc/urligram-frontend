const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require('./config.test.json');
const CompressionPlugin = require('compression-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    extensions: ['.js', '.ts', '.tsx', '.d.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: ['ts-loader'],
        exclude: /node_modules/,
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
        '<% if (is_desktop) { %>isDesktop<% } else if (is_tablet) { %>isTablet<% } else if (is_phone || is_mobile) { %>isMobile<% } %>',
      body: '<%- body %>',
      data: '<%- data %>',
    }),

    new webpack.DefinePlugin({
      isBrowser: true,
      'process.env': {
        PORT_SERVER: config.PORT_SERVER_DEVELOPMENT,
        PORT_API: config.PORT_API_DEVELOPMENT,
        ENDPOINT_API: JSON.stringify(config.ENDPOINT_API_DEVELOPMENT),
        ENDPOINT_SERVER: JSON.stringify(config.ENDPOINT_SERVER_DEVELOPMENT),
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
