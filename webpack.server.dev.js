const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require('./config.test.json');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  name: 'server',
  entry: ['./src/server/App.ts'],
  mode: 'development',
  output: {
    filename: 'server.js',
    path: __dirname + '/dist',
    libraryTarget: 'commonjs2',
    publicPath: '/',
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
    extensions: ['.js', '.ts', '.tsx', '.d.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          'css-loader',
          'less-loader',
        ],
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
      cleanOnceBeforeBuildPatterns: ['./server.js', './server.js.map', './server.js.gz'],
    }),

    // Setting a variable to identify browser from server
    new webpack.DefinePlugin({
      isBrowser: false,
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
    // Copying files to /assets
    new CopyWebpackPlugin([
      {
        from: path.join('src', 'shared', 'assets', 'img'),
        to: path.join('img'),
      },
      // Copying the SVGs in /shared/assets/svg to dist/svg, to we have
      // static access to them.
      // If we set files-loading for each component this may be unnecesary
      {
        from: path.join('src', 'shared', 'assets', 'svg'),
        to: path.join('svg'),
      },
      {
        from: path.join('src', 'shared', 'assets', 'favicon'),
        to: path.join('favicon'),
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'webpack-report.html',
    }),
  ],
};
