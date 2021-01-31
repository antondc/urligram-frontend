import React from 'react';

import SidebarBlock from 'Components/SidebarBlock';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import SidebarTags from '.';

const props = {
  tags: [
    {
      id: 1,
      name: 'aaa',
    },
    {
      id: 2,
      name: 'aaa',
    },
    {
      id: 3,
      name: 'aaa',
    },
    {
      id: 4,
      name: 'aaa',
    },
    {
      id: 5,
      name: 'aaa',
    },
    {
      id: 6,
      name: 'aaa',
    },
  ],
};
export default {
  component: SidebarTags,
  title: 'SidebarTags',
  decorators: [withKnobs],
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <div style={{ padding: '30px', width: '400px' }}>
    <SidebarBlock loading={knobs.skeleton()} title="My Tags">
      <SidebarTags items={props.tags} />
    </SidebarBlock>
  </div>
);
