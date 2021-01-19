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
      width: '1200px',
      height: '963px',
    },
  },
  Tablet: {
    name: 'Tablet',
    styles: {
      width: '800px',
      height: '801px',
      padding: '0px',
    },
  },
};

addParameters({
  viewport: {
    viewports: customViewports, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: 'Tablet',
  },
});
