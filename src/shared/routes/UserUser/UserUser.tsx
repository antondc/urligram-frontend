import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Fade, Flex, H4, Hr } from '@antoniodcorrea/components';

import './UserUser.less';

interface Props {
  userId: string;
  user: UserState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  userLists: ListState[];
  userListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
  followersUsers: UserState[];
  followersUsersLoading: boolean;
}

export const UserUser: React.FC<Props> = ({
  userId,
  user,
  bookmarksIds,
  bookmarksLoading,
  userLists,
  userListsLoading,
  followingLists,
  followingListsLoading,
  followingUsers,
  followingUsersLoading,
  followersUsers,
  followersUsersLoading,
}) => (
  <div className="UserUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="User lists" href="" loading={userListsLoading}>
          <SidebarListLists items={userLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Lists followed" href="" loading={followingListsLoading}>
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <H4>@{user?.name}</H4>
          <Hr spacer />
          {!!bookmarksLoading ? (
            <BookmarkRowSkeletonGroup />
          ) : (
            bookmarksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <BookmarkRow id={id} />
              </React.Fragment>
            ))
          )}
          <Hr spacer size="big" />
          <Flex horizontal="center">
            <Fade mounted={!!bookmarksIds?.length} speed="fastest">
              <Button text="Load more" />
            </Fade>
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="Following Users" href={`users/${userId}/following`} loading={followingUsersLoading}>
          <SidebarListUsers items={followingUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Followers" href={`users/${userId}/followers`} loading={followersUsersLoading}>
          <SidebarListUsers items={followersUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
