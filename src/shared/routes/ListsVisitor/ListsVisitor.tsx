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
import { ListRowSkeletonGroup } from '../../components/ListRow/ListSkeletonGroup';

import './ListsVisitor.less';

interface Props {
  listsIds: number[];
  loading: boolean;
  popularLists: ListState[];
}

export const ListsVisitor: React.FC<Props> = ({ listsIds, popularLists, loading }) => (
  <div className="ListsVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>{/*  */}</Sidebar>
      <Main>
        <MainHeader title="My lists" />
        {loading ? (
          <ListRowSkeletonGroup />
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
