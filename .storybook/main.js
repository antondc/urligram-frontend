const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  excludeStories: /.*Props$/,
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
  ],
  // https://storybook.js.org/docs/react/configure/typescript
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../'),
    });

    /* START https://github.com/storybookjs/storybook/issues/5708#issuecomment-467364602 */
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.extensions.push('.svg');

    config.module.rules.forEach(function (data, key) {
      if (data.test.toString().indexOf('svg|') >= 0) {
        config.module.rules[key].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

        return false;
      }
    });
    /* END https://github.com/storybookjs/storybook/issues/5708#issuecomment-467364602 */

    config.resolve.extensions.push('.ts', '.tsx', '.svg');

    config.resolve.alias = {
      Root: path.resolve(process.cwd()),
      Redux: path.resolve(process.cwd(), 'src/shared/redux/'),
      Modules: path.resolve(process.cwd(), 'src/shared/redux/modules/'),
      Common: path.resolve(process.cwd(), 'src/shared/common/'),
      Components: path.resolve(process.cwd(), 'src/shared/components/'),
      Assets: path.resolve(process.cwd(), 'src/shared/assets/'),
      Router: path.resolve(process.cwd(), 'src/shared/router/'),
      Tools: path.resolve(process.cwd(), 'src/shared/tools/'),
      Services: path.resolve(process.cwd(), 'src/shared/services/'),
      Ui: path.resolve(process.cwd(), 'src/shared/ui/'),
      Pages: path.resolve(process.cwd(), 'src/shared/pages/'),
    };

    return config;
  },
};
