const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const config = require('./config.test.json');
const webpack = require('webpack');

module.exports = merge.multiple(common, {
  server: {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
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
                // modules: true,
                importLoaders: 1,
                localIdentName: '[name]-[local]-[hash:4]',
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      // Setting a variable to identify browser from server
      new webpack.DefinePlugin({
        'process.env': {
          PORT_SERVER: config.PORT_SERVER_DEVELOPMENT,
          PORT_API: config.PORT_API_DEVELOPMENT,
          ENDPOINT_API: JSON.stringify(config.ENDPOINT_API_DEVELOPMENT),
          ENDPOINT_SERVER: JSON.stringify(config.ENDPOINT_SERVER_DEVELOPMENT),
        },
      }),
    ],
  },
  client: {
    mode: 'development',
    // Including source maps
    devtool: 'cheap-module-eval-source-map',
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
                // modules: true,
                importLoaders: 1,
                localIdentName: '[name]-[local]-[hash:4]',
                sourceMap: true,
                minimize: true,
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
                      browsers: ['>0.25%'],
                      flexbox: 'no-2009',
                    }),
                  ];
                },
              },
            },
            { loader: 'less-loader' },
          ],
        },
      ],
    },
    plugins: [
      // Setting a variable to identify browser from server
      new webpack.DefinePlugin({
        'process.env': {
          PORT_SERVER: config.PORT_SERVER_DEVELOPMENT,
          PORT_API: config.PORT_API_DEVELOPMENT,
          ENDPOINT_API: JSON.stringify(config.ENDPOINT_API_DEVELOPMENT),
          ENDPOINT_SERVER: JSON.stringify(config.ENDPOINT_SERVER_DEVELOPMENT),
        },
      }),
    ],
  },
});
