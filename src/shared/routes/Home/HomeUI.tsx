import React from 'react';

import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { lists } from 'Tools/mockData/mockLists';
import { tags } from 'Tools/mockData/mockTags';
import { users } from 'Tools/mockData/mockUsers';
import { Border, Flex, Hr } from '@antoniodcorrea/components';

import './Home.less';

export const HomeUI: React.FC = () => (
  <div className="Home">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarListLists title="Popular Lists" items={lists} id="PopularLists" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={lists} id="PopularLists2" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={lists} id="PopularLists3" />
      </Sidebar>
      <Main>
        <Border>Home</Border>
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
