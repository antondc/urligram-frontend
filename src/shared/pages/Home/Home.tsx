import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListBookmarks from 'Components/SidebarListBookmarks';
import SidebarListUsers from 'Components/SidebarListUsers';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { SessionState } from 'Modules/Session/session.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Flex, Frame, Hr, Span } from 'Vendor/components';

import './Home.less';

export interface Props {
  session: SessionState;
  bookmarksIds: number[];
  bookmarksIdsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  myRecentBookmarks: BookmarkState[];
  myRecentBookmarksLoading: boolean;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  url: string;
}

export const Home: React.FC<Props> = ({
  session,
  bookmarksIds,
  bookmarksIdsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  myRecentBookmarks,
  myRecentBookmarksLoading,
  page,
  totalItems,
  url,
}) => (
  <div className="Home">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame className="Home-links" grow padding="small">
          <MainContent>
            {bookmarksIdsLoading ? (
              <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
            )}
            {!bookmarksIdsLoading && !bookmarksIds?.length && (
              <Span weight="semiBold">ⵁ Start following users to receive recommended bookmarks.</Span>
            )}
          </MainContent>
        </Frame>
        <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      </Main>
      <Sidebar>
        <SidebarListUsers
          title="Followers"
          users={mostFollowedUsers}
          loading={mostFollowedUsersLoading}
          href="users?sort=-followers&page[size]=10"
        />
        <Hr size="nano" />
        <SidebarListUsers
          title="Followers"
          users={newUsers}
          loading={newUsersLoading}
          href="users?sort=createdAt&page[size]=10"
        />
        <Hr size="nano" />
        {!!session?.id && (
          <>
            <SidebarListBookmarks
              title="My recent bookmarks"
              loading={myRecentBookmarksLoading}
              bookmarks={myRecentBookmarks}
            />
            <Hr size="nano" />
          </>
        )}
      </Sidebar>
    </Flex>
  </div>
);
