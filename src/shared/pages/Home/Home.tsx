import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListBookmarks from 'Components/SidebarListBookmarks';
import SidebarListUsers from 'Components/SidebarListUsers';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { SessionState } from 'Modules/Session/session.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';

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
  <>
    <div className="Home">
      <div className="Home-headerTitle">Home</div>
      <div className="Home-bookmarks">
        {bookmarksIdsLoading ? (
          <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
        )}
        {!bookmarksIdsLoading && !bookmarksIds?.length && (
          <div className="Home-noResults">ⵁ Start following users to receive recommended bookmarks.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
    </div>
    <Sidebar>
      <SidebarListUsers
        className="Home-sidebarListUsersFirst"
        title="Followers"
        users={mostFollowedUsers}
        loading={mostFollowedUsersLoading}
        href="users?sort=-followers&page[size]=10"
      />
      <SidebarListUsers
        title="New Users"
        users={newUsers}
        loading={newUsersLoading}
        href="users?sort=createdAt&page[size]=10"
      />
      {!!session?.id && (
        <SidebarListBookmarks
          title="My recent bookmarks"
          loading={myRecentBookmarksLoading}
          bookmarks={myRecentBookmarks}
        />
      )}
    </Sidebar>
  </>
);
