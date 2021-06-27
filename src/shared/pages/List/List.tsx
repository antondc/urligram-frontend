import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListFollowButton from 'Components/ListFollowButton';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Hr, SortBy, Space } from 'Vendor/components';

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
  <>
    <div className="List">
      <div className="List-header List-headerTitle">
        <span>
          Bookmarks in
          <Space />
          <A href={`/lists/${list?.id}`} underlined>
            {list?.name}
          </A>
        </span>
        <ListFollowButton className="List-joinList" listId={list?.id} />
      </div>
      <div className="List-header">
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
      </div>
      <div className="List-bookmarks">
        {bookmarksLoading ? (
          <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
        )}
        {!bookmarksLoading && !bookmarksIds?.length && (
          <div className="UserBookmarks-noResults">ⵁ We didnt find any bookmark.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListTags
        className="List-sidebarListTagsFirst"
        title="Tags In This List"
        loading={tagsInThisListLoading}
        tags={tagsInThisList}
      />

      <SidebarListUsers title="People in this list" users={usersInThisList} loading={usersInThisListLoading} />
    </Sidebar>
  </>
);
