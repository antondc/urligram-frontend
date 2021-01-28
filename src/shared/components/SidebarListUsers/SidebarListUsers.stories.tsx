import React from 'react';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import SidebarBlock from '../SidebarBlock';
import SidebarListUsers from '.';
import { MockUsersList } from './SidebarListUsersStoriesProps';

export default {
  component: SidebarListUsers,
  title: 'SidebarListUsers',
  decorators: [withKnobs],
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <div style={{ padding: '30px', width: '400px' }}>
    <SidebarBlock loading={knobs.skeleton()} title="Some title">
      <SidebarListUsers items={MockUsersList} loading={knobs.skeleton()} />
    </SidebarBlock>
  </div>
);
