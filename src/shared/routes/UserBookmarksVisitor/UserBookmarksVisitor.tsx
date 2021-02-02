import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { BookmarkRowSkeletonGroup } from 'Root/src/shared/components/BookmarkRow/BookmarkRowSkeletonGroup';
import { Border, Button, Fade, Flex, H4, Hr } from '@antoniodcorrea/components';
import SidebarBlock from '../../components/SidebarBlock';
import { UserState } from '../../redux/modules/Users/users.types';

import './UserBookmarksVisitor.less';

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

export const UserBookmarksVisitor: React.FC<Props> = ({
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
  <div className="UserBookmarksVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="User Lists" href={`users/${userId}/lists?filter[role]=admin`} loading={userListsLoading}>
          <SidebarListLists items={userLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="Following Lists"
          href={`users/${userId}/lists?filter[role]=reader,editor`}
          loading={followingListsLoading}
        >
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <H4>
            Bookmarks of <A href={`/users/${userId}`}>@{user?.name}</A>
          </H4>
          <Hr spacer />
          {bookmarksLoading ? (
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
