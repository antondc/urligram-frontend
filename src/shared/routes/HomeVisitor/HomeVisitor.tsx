import React from 'react';

import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { Border, Flex, Hr } from '@antoniodcorrea/components';
import { UserState } from '../../redux/modules/Users/users.types';

import './HomeVisitor.less';

export interface Props {
  mostFollowedLists: ListState[];
  mostFollowedListsLoading: boolean;
  newLists: ListState[];
  newListsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
}

export const HomeVisitor: React.FC<Props> = ({
  mostFollowedLists,
  mostFollowedListsLoading,
  newLists,
  newListsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
}) => (
  <div className="HomeVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="Most Followed Lists" loading={mostFollowedListsLoading}>
          <SidebarListLists items={mostFollowedLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Lists" loading={newListsLoading}>
          <SidebarListLists items={newLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Most Followed Users" loading={mostFollowedUsersLoading}>
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border>HomeVisitor</Border>
      </Main>
      <Sidebar>
        {/* <SidebarListTags title="Trending Tags" items={tags} />
        <Hr spacer />
        <SidebarListUsers title="Popular Users" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Following" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Followers" items={users} /> */}
      </Sidebar>
    </Flex>
  </div>
);
