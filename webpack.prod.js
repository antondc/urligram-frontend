const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const config = require('./config.test.json');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge.multiple(common, {
  server: {
    mode: 'production',
    module: {
      rules: [
        // Compiling less files for backend, CSS modules disabled
        {
          test: /\.(less|css)$/,
          use: [
            {
              loader: 'isomorphic-style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: false,
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      // Analyze modules sizes
      // new BundleAnalyzerPlugin(),
      new UglifyJsPlugin({
        parallel: true,
      }),

      // Setting a variable to identify browser from server
      new webpack.DefinePlugin({
        'process.env': {
          PORT_SERVER: config.PORT_SERVER_PRODUCTION,
          PORT_API: config.PORT_API_PRODUCTION,
          ENDPOINT_API: JSON.stringify(config.ENDPOINT_API_PRODUCTION),
          ENDPOINT_SERVER: JSON.stringify(config.ENDPOINT_SERVER_PRODUCTION),
        },
      }),
    ],
  },
  client: {
    mode: 'production',
    cache: false,
    plugins: [
      // Analyze modules sizes
      // new BundleAnalyzerPlugin(),
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
    module: {
      rules: [
        // Compiling less files for frontend, CSS modules disabled
        {
          test: /\.(less|css)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: false,
              },
            },
            // Prefixing and solving css issues
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      Browserslist: ['>0.25%'],
                      flexbox: 'no-2009',
                    }),
                  ];
                },
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      // Setting a variable to identify browser from server
      new webpack.DefinePlugin({
        'process.env': {
          PORT_SERVER: config.PORT_SERVER_PRODUCTION,
          PORT_API: config.PORT_API_PRODUCTION,
          ENDPOINT_API: JSON.stringify(config.ENDPOINT_API_PRODUCTION),
          ENDPOINT_SERVER: JSON.stringify(config.ENDPOINT_SERVER_PRODUCTION),
        },
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
});
