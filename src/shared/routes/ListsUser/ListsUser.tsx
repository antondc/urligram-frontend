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

import './ListsUser.less';

interface Props {
  sessionId: string;
  listsIds: number[];
  listsIdsLoading: boolean;
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
  followersUsers: UserState[];
  followersUsersLoading: boolean;
}

export const ListsUser: React.FC<Props> = ({
  sessionId,
  listsIds,
  listsIdsLoading,
  myLists,
  myListsLoading,
  followingLists,
  followingListsLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
  followersUsers,
  followersUsersLoading,
}) => (
  <div className="ListsUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="My Lists" href={`/users/${sessionId}/lists?filter[role]=admin`} loading={myListsLoading}>
          <SidebarListLists items={myLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="Following Lists"
          href={`/users/${sessionId}/lists?page[size]=10&filter[role]=editor,reader`}
          loading={followingListsLoading}
        >
          <SidebarListLists items={followingLists} />
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
        <SidebarBlock title="My Tags" loading={userMostUsedTagsLoading}>
          <SidebarListTags items={userMostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="My Followers"
          href={`users/${sessionId}/followers?page[size]=10`}
          loading={followersUsersLoading}
        >
          <SidebarListUsers items={followersUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
