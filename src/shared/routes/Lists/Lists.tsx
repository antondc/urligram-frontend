import React from 'react';

import ListRow from 'Components/ListRow';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { tags } from 'Tools/mockData/mockTags';
import { users } from 'Tools/mockData/mockUsers';
import { Button, Flex, Hr } from '@antoniodcorrea/components';
import { ListsSkeleton } from './ListsSkeleton';

import './Lists.less';

interface Props {
  listsIds: number[];
  loading: boolean;
  popularLists: ListState[];
}

export const Lists: React.FC<Props> = ({ listsIds, popularLists, loading }) => (
  <div className="Lists">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        {/* <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists2" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists3" /> */}
      </Sidebar>
      <Main>
        <MainHeader title="My lists" />
        {loading ? (
          <ListsSkeleton />
        ) : (
          listsIds.map((id, index) => (
            <React.Fragment key={id}>
              {!!index && <Hr spacer />}
              <ListRow id={id} />
            </React.Fragment>
          ))
        )}
        <Hr spacer size="big" />
        <Flex horizontal="center">
          <Button text="Load more" />
        </Flex>
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
