import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    default: 'Medium',
    paddings: {
      values: [
        { name: 'None', value: '0px' },
        { name: 'Medium', value: '20px' },
        { name: 'Large', value: '100px' },
      ],
    },
    viewport: {
      defaultViewport: 'Desktop',
      viewports: {
        Desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '1000px',
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
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'transparent',
          value: 'transparent',
        },
        {
          name: 'gray',
          value: 'gray',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'light',
          value: '#2e2e2e',
        },
      ],
      grid: {
        cellSize: 10,
        opacity: 0.1,
        cellAmount: 2,
        offsetX: 0,
        offsetY: 0,
      },
    },
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

export default preview;
