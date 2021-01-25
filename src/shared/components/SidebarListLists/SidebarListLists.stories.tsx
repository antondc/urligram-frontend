import React from 'react';

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
  <div style={{ padding: '30px', width: '400px' }}>
    <SidebarListLists {...Props} loading={knobs.skeleton()} />
  </div>
);
