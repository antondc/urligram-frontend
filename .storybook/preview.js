import { addParameters } from '@storybook/react';

/* Activate to center view */
// import { addDecorator } from '@storybook/react';
// import centered from '@storybook/addon-centered/react';
// addDecorator(centered);
/* END */

const customViewports = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1200px',
      height: '963px',
    },
  },
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '801px',
    },
  },
};

addParameters({
  viewport: {
    viewports: customViewports, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: 'Desktop',
  },
});
