import React from 'react';

import SidebarBlock from 'Components/SidebarBlock';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { mockUser } from '../../redux/modules/Users/user.data';
import SidebarListUsers from '.';

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
    <SidebarBlock loading={knobs.skeleton()} title="Some title" href="test-url">
      <SidebarListUsers items={[mockUser, mockUser, mockUser]} loading={knobs.skeleton()} />
    </SidebarBlock>
  </div>
);
