import React from 'react';

import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import { ListState } from 'Modules/Lists/lists.types';
import { Border, Flex, Hr } from '@antoniodcorrea/components';

import './HomeUser.less';

interface Props {
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
}

export const HomeUser: React.FC<Props> = ({ myLists, myListsLoading, followingLists, followingListsLoading }) => (
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
