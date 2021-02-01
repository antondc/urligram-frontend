import React from 'react';

import SidebarBlock from 'Components/SidebarBlock';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import SidebarTags from '.';

const props = {
  tags: [],
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
    <SidebarBlock loading={knobs.skeleton()} title="My Tags" href="test-url">
      <SidebarTags items={props.tags} />
    </SidebarBlock>
  </div>
);
