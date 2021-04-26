import React from 'react';

import SidebarBlock from 'Components/SidebarBlock';
import { mockBookmark } from 'Modules/Bookmarks/bookmark.data';
import { ProviderWrapper } from 'Tools/storybook/provider';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import SidebarListBookmarks from '.';

const props = {
  id: 'PopularLists',
  title: 'Popular lists',
  items: [mockBookmark, mockBookmark, mockBookmark],
};
export default {
  component: SidebarListBookmarks,
  title: 'SidebarListBookmarks',
  decorators: [withKnobs],
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <ProviderWrapper>
    <div style={{ padding: '30px', width: '400px' }}>
      <SidebarBlock loading={knobs.skeleton()} title="Some title" href="test-url">
        <SidebarListBookmarks loading={knobs.skeleton()} {...props} />
      </SidebarBlock>
    </div>
  </ProviderWrapper>
);
