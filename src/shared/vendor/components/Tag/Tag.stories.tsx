import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { A } from '../A';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Tag } from '.';

export default {
  component: Tag,
  title: 'Tag',
  decorators: [withKnobs],
};

export const Default: React.FC = () => (
  <div style={{ padding: '10px' }}>
    <H1>Tag</H1>
    <Hr spacer />
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ margin: '0 8px 8px 0' }}>
        <A href="/" styled={false}>
          <Tag>Tag</Tag>
        </A>
      </div>
      <div style={{ margin: '0 8px 8px 0' }}>
        <Tag>Yeah</Tag>
      </div>
      <div style={{ margin: '0 8px 8px 0' }}>
        <Tag>Rock</Tag>
      </div>
      <div style={{ margin: '0 8px 8px 0' }}>
        <Tag>Lalala</Tag>
      </div>
    </div>
  </div>
);
