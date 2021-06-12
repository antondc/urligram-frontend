import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListFollowButton from 'Components/ListFollowButton';
import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTagsRefactor from 'Components/SidebarListTagsRefactor';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { A, Flex, Frame, Hr, SortBy, Span } from 'Vendor/components';

import './List.less';

interface Props {
  list: ListState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  usersInThisList: UserState[];
  usersInThisListLoading: boolean;
  tagsInThisList: TagState[];
  tagsInThisListLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
}

export const List: React.FC<Props> = ({
  list,
  bookmarksIds,
  bookmarksLoading,
  usersInThisList,
  usersInThisListLoading,
  tagsInThisList,
  tagsInThisListLoading,
  page,
  totalItems,
  url,
  sort,
}) => (
  <div className="List">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame grow padding="small">
          <Flex horizontal="between" noWrap>
            <Span size="normal" weight="semiBold">
              Bookmarks in <A href={`/lists/${list?.id}`}>{list?.name}</A>
            </Span>
            <Flex growHorizontal={false} vertical="top">
              <ListFollowButton className="List-joinList" listId={list?.id} size="normal" />
            </Flex>
          </Flex>
        </Frame>
        <Frame grow padding="none" shadow={false} borderTop={false} borderBottom={false}>
          <Flex horizontal="between">
            <SortBy
              options={[
                { label: 'Rating', field: 'vote' },
                { label: 'Bookmarks', field: 'timesbookmarked' },
                { label: 'Date', field: 'updatedAt' },
              ]}
              href={url}
              currentSort={sort}
              loading={bookmarksLoading}
            />
          </Flex>
        </Frame>
        <Frame grow padding="small">
          <MainContent>
            {bookmarksLoading ? (
              <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
            )}
            {!bookmarksLoading && !bookmarksIds?.length && <Span weight="semiBold">ⵁ We didn find any bookmark.</Span>}
          </MainContent>
        </Frame>
        <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      </Main>
      <Sidebar>
        <SidebarListUsers title="People in this list" users={usersInThisList} loading={usersInThisListLoading} />
        <Hr size="nano" />
        <SidebarListTagsRefactor title="Tags In This List" loading={tagsInThisListLoading} tags={tagsInThisList} />
      </Sidebar>
    </Flex>
  </div>
);
