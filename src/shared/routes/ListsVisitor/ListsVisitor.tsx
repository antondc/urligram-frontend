import React from 'react';

import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListSkeletonGroup';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Flex, Hr } from '@antoniodcorrea/components';

import './ListsVisitor.less';

interface Props {
  listsIds: number[];
  listsIdsLoading: boolean;
  popularLists: ListState[];
  popularListsLoading: boolean;
  newLists: ListState[];
  newListsLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
}

export const ListsVisitor: React.FC<Props> = ({
  listsIds,
  listsIdsLoading,
  popularLists,
  popularListsLoading,
  newLists,
  newListsLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  newUsers,
  newUsersLoading,
}) => (
  <div className="ListsVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="Popular Lists"
          href="lists?sort=-members&page[size]=10&filter[role]=admin"
          loading={popularListsLoading}
        >
          <SidebarListLists items={popularLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="New Lists"
          href="lists?sort=-createdAt&page[size]=10&filter[role]=admin"
          loading={newListsLoading}
        >
          <SidebarListLists items={newLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <MainHeader title="My lists" />
          {listsIdsLoading ? (
            <ListRowSkeletonGroup />
          ) : (
            listsIds?.map((id, index) => (
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
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="Most Used Tags" loading={mostUsedTagsLoading}>
          <SidebarListTags items={mostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdat&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
