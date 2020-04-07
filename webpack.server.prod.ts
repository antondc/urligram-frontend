import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import config from './config.test.json';
import CompressionPlugin from 'compression-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { API_DEVELOPMENT_ENDPOINT, SERVER_DEVELOPMENT_ENDPOINT } from './src/shared/constants/endpoints';

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
        use: ['css-loader', 'less-loader'],
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
        ENDPOINT_API: API_DEVELOPMENT_ENDPOINT,
        ENDPOINT_SERVER: SERVER_DEVELOPMENT_ENDPOINT,
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
