import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Flex, Frame, Hr, Span } from 'Vendor/components';

import './Home.less';

export interface Props {
  bookmarksIds: number[];
  bookmarksIdsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  url: string;
}

export const Home: React.FC<Props> = ({
  bookmarksIds,
  bookmarksIdsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
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
        <SidebarBlock
          title="Most Followed Users"
          href="users?sort=-followers&page[size]=10"
          loading={mostFollowedUsersLoading}
        >
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdAt&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
