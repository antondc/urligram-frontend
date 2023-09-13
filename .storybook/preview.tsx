import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Preview } from '@storybook/react';

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

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
      defaultViewport: 'Desktop',
    },
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

export default preview;
