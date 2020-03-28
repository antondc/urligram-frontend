const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals'); // Remove node_modules when creating the bundle
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // -  -  -  -  -  -  -  -  -  -  - SERVER -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  server: {
    name: 'server',
    entry: ['./src/server/App.ts'],
    output: {
      filename: 'server.js',
      path: __dirname + '/dist',
      libraryTarget: 'commonjs2',
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
      extensions: ['.ts', '.tsx', '.d.ts', '.js', '.json'],
    },
    module: {
      rules: [
        // Fonts loader
        {
          test: /\.(eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: '/fonts/',
            },
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    // Messages on the console
    stats: 'errors-only',
    plugins: [
      new CaseSensitivePathsPlugin(),
      // Plugin for nice terminal messages
      new FriendlyErrorsWebpackPlugin(),
      // Setting a variable to identify browser from server
      new webpack.DefinePlugin({
        isServer: true,
        isBrowser: false,
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
      }),
    ],
  },
  // -  -  -  -  -  -  -  -  -  -  - CLIENT -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  client: {
    name: 'client',
    entry: ['./src/client/App.tsx'],
    output: {
      filename: 'bundle-[hash:4].js',
      path: __dirname + '/dist',
      publicPath: '/',
    },
    externals: {},
    resolve: {
      extensions: ['.ts', '.tsx', '.d.ts', '.js', '.json'],
    },
    module: {
      rules: [
        // Fonts loader
        {
          test: /\.(eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
            },
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        // Loading .svg sprites. SpriteFilename has to be absolute. This test has to be at the end
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    // Messages on the console
    stats: 'errors-only',
    plugins: [
      new CaseSensitivePathsPlugin(),
      // Plugin for SvgSprites
      new HtmlWebPackPlugin({
        baseUrl: '',
        inject: true,
        template: './src/server/views/indexBase.ejs',
        filename: '../src/server/views/index.ejs',
        toHtml: '<%- toHtml %>',
        toHead: '<%- toHead %>',
        deviceDetector:
          '<% if (is_desktop) { %>isDesktop<% } else if (is_tablet) { %>isTablet<% } else if (is_phone || is_mobile) { %>isMobile<% } %>',
        body: '<%- body %>',
        data: '<%- data %>',
      }),
      // Clean only files, no folders
      new CleanWebpackPlugin(
        [
          'dist/styles-*.css',
          'dist/styles-*.gz',
          'dist/styles-*.map',
          'dist/bundle-*.js',
          'dist/bundle-*.gz',
          'dist/bundle-*.map',
        ],
        {
          watch: true,
          verbose: false,
          beforeEmit: true,
        }
      ),
      new MiniCssExtractPlugin({
        filename: 'styles-[hash:4].css',
        chunkFilename: 'styles-[hash:4].css',
      }),
      new FriendlyErrorsWebpackPlugin(),
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
      // Setting a variable to identify browser from server
      new webpack.DefinePlugin({
        isServer: false,
        isBrowser: true,
      }),

      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.otf$|\.js$|\.css$|\.html$/,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'webpack-report.html',
      }),
    ],
  },
};
