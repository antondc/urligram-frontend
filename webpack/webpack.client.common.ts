import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

import { WEBPACK_ROOT, WEBPACK_SRC } from './constants';

const webpackClientCommonConfig: Configuration = {
  name: 'client',
  context: WEBPACK_SRC,
  target: 'web',
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
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.otf$|\.js$|\.css$|\.html$/,
    }),
    new NodePolyfillPlugin(),
  ],
};

export default webpackClientCommonConfig;
