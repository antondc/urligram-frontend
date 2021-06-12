import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import SidebarListTagsRefactor from '.';

const props = {
  tags: [],
};
export default {
  component: SidebarListTagsRefactor,
  title: 'SidebarListTagsRefactor',
  decorators: [withKnobs],
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <ProviderWrapper>
    <div style={{ padding: '30px', width: '400px' }}>
      <SidebarListTagsRefactor tags={props.tags} loading={knobs.skeleton()} title="My Tags" href="test-url" />
    </div>
  </ProviderWrapper>
);
