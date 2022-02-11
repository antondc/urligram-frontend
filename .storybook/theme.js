import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: 'black',
  colorSecondary: '#ababab',

  // UI
  appBg: '#efefef',
  appContentBg: 'lightgray',
  appBorderColor: 'lightgray',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  // textInverseColor: "",

  // Toolbar default and active colors
  barTextColor: 'black',
  barSelectedColor: 'black',
  barBg: '#e6e6e6',

  // Form colors
  inputBg: '#efefef',
  inputBorder: 'efefef',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Woprs',
  brandUrl: '',
  brandImage: '',
});
