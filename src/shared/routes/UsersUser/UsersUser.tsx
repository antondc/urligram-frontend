import React from 'react';

import A from 'Components/A';
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

import './UsersUser.less';

interface Props {
  usersCurrentIds: string[];
  usersLoading: boolean;
  sessionId: string;
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  myTags: TagState[];
  myTagsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
}

export const UsersUser: React.FC<Props> = ({
  usersCurrentIds,
  usersLoading,
  sessionId,
  myLists,
  myListsLoading,
  followingLists,
  followingListsLoading,
  myTags,
  myTagsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
}) => (
  <div className="UsersUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="My Lists" href={`users/${sessionId}/lists`} loading={myListsLoading}>
          <SidebarListLists items={myLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Following Lists" href={`users/${sessionId}/lists`} loading={followingListsLoading}>
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <A href={`users/${sessionId}/recommended`} frontend>
            <H4>Users</H4>
          </A>
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
        <SidebarBlock title="My Tags" href={`users/${sessionId}/tags`} loading={myTagsLoading}>
          <SidebarListTags items={myTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Most Followed Users" href={'users?sort=-followers'} loading={mostFollowedUsersLoading}>
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
