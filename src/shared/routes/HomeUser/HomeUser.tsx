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
}

export const HomeUser: React.FC<Props> = ({ myLists, myListsLoading }) => (
  <div className="HomeUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="Most Followed Lists" loading={myListsLoading}>
          <SidebarListLists items={myLists} />
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
