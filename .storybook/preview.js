import { addParameters } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

/* Activate to center view */
// import { addDecorator } from '@storybook/react';
// import centered from '@storybook/addon-centered/react';
// addDecorator(centered);
/* END */

addDecorator(StoryRouter());

const customViewports = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '600px',
      height: '1200px',
      padding: '0',
      border: 'none',
    },
  },
  Tablet: {
    name: 'Tablet',
    styles: {
      width: '700px',
      height: '800px',
      padding: '0',
      border: 'none',
    },
  },
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '702px',
      padding: '0',
      border: 'none',
    },
  },
};

addParameters({
  viewport: {
    viewports: customViewports, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: 'Desktop',
  },
});
