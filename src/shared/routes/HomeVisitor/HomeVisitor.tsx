import React from 'react';

import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { tags } from 'Tools/mockData/mockTags';
import { users } from 'Tools/mockData/mockUsers';
import { Border, Flex, Hr } from '@antoniodcorrea/components';
import SidebarBlock from '../../components/SidebarBlock';

import './HomeVisitor.less';

interface Props {
  mostFollowedLists: ListState[];
  mostFollowedListsLoading: boolean;
}

export const HomeVisitor: React.FC<Props> = ({ mostFollowedLists, mostFollowedListsLoading }) => (
  <div className="HomeVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="Most Followed Lists" loading={mostFollowedListsLoading}>
          <SidebarListLists items={mostFollowedLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border>HomeVisitor</Border>
      </Main>
      <Sidebar>
        <SidebarListTags title="Trending Tags" items={tags} />
        <Hr spacer />
        <SidebarListUsers title="Popular Users" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Following" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Followers" items={users} />
      </Sidebar>
    </Flex>
  </div>
);
