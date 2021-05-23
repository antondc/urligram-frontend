import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr, Span } from 'Vendor/components';
import { BookmarkRowSkeletonGroup } from '../../components/BookmarkRow/BookmarkRowSkeletonGroup';
import Pagination from '../../components/Pagination';

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
        <Border className="Home-links" grow>
          <Flex horizontal="between" vertical="bottom">
            <H4>Recommended bookmarks</H4>
          </Flex>
          <Hr spacer size="small" />
          {bookmarksIdsLoading ? (
            <BookmarkRowSkeletonGroup length={5} />
          ) : (
            bookmarksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer size="small" />}
                <BookmarkRow id={id} />
              </React.Fragment>
            ))
          )}
          {!bookmarksIdsLoading && !bookmarksIds?.length && (
            <Span bold>ⵁ Start following users to receive recommended bookmarks.</Span>
          )}
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Border>
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
