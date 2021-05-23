import React from 'react';

import SidebarBlock from 'Components/SidebarBlock';
import { mockUser } from 'Modules/Users/user.data';
import { ProviderWrapper } from 'Tools/storybook/provider';
import { boolean, withKnobs } from '@storybook/addon-knobs';
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
  <ProviderWrapper>
    <div style={{ padding: '30px', width: '400px' }}>
      <SidebarBlock loading={knobs.skeleton()} title="Some title" href="test-url">
        <SidebarListUsers items={[mockUser, mockUser, mockUser]} loading={knobs.skeleton()} />
      </SidebarBlock>
    </div>
  </ProviderWrapper>
);
