import React from 'react';

import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, Hr } from '@antoniodcorrea/components';
import SidebarListUsers from '../../components/SidebarListUsers';

import './HomeUser.less';

interface Props {
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  myTags: TagState[];
  myTagsLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
}

export const HomeUser: React.FC<Props> = ({
  myLists,
  myListsLoading,
  followingLists,
  followingListsLoading,
  myTags,
  myTagsLoading,
  followingUsers,
  followingUsersLoading,
}) => (
  <div className="HomeUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="My Lists" loading={myListsLoading}>
          <SidebarListLists items={myLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Following Lists" loading={followingListsLoading}>
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border>HomeUser</Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="My Tags" loading={myTagsLoading}>
          <SidebarListTags items={myTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Following Users" loading={followingUsersLoading}>
          <SidebarListUsers items={followingUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
