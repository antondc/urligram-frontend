import React from 'react';

import SidebarBlock from 'Components/SidebarBlock';
import { ProviderWrapper } from 'Tools/storybook/provider';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import SidebarListLists from '.';
import { Props } from './SidebarListListsSkeletonProps';

export default {
  component: SidebarListLists,
  title: 'SidebarListLists',
  decorators: [withKnobs],
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <ProviderWrapper>
    <div style={{ padding: '30px', width: '400px' }}>
      <SidebarBlock loading={knobs.skeleton()} title="Some title" href="test-url">
        <SidebarListLists loading={knobs.skeleton()} {...Props} />
      </SidebarBlock>
    </div>
  </ProviderWrapper>
);
