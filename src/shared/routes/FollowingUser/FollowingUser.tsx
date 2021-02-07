import React from 'react';

import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr } from '@antoniodcorrea/components';

import './FollowingUser.less';

export interface Props {
  user: UserState;
  userId: string;
  usersCurrentIds: string[];
  usersLoading: boolean;
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
}

export const FollowingUser: React.FC<Props> = ({
  user,
  userId,
  usersCurrentIds,
  usersLoading,
  myLists,
  myListsLoading,
  followingLists,
  followingListsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
}) => (
  <div className="FollowingUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="My Lists"
          href={`users/${userId}/lists?sort=-members&page[size]=10&filter[role]=admin`}
          loading={myListsLoading}
        >
          <SidebarListLists items={myLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="Following Lists"
          href={`lists/${userId}/lists?sort=-createdat&page[size]=10&filter[role]=reader,editor`}
          loading={followingListsLoading}
        >
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
      <Main>
        <Border className="FollowingUser-tags" grow>
          <H4>Users followed by @{user?.name}</H4>
          <Hr spacer />
          {usersLoading ? (
            <UserRowSkeletonGroup />
          ) : (
            usersCurrentIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <UserRow id={id} />
              </React.Fragment>
            ))
          )}
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="MyFollowed Tags" href={`users/${userId}/bookmarks`} loading={userMostUsedTagsLoading}>
          <SidebarListTags items={userMostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Most Followed Users" href="users?sort=-followers" loading={mostFollowedUsersLoading}>
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
