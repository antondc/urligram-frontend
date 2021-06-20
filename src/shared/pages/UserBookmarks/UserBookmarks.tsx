import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListUsers from 'Components/SidebarListUsers';
import { BookmarksByKey } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { A, FadeInOut, Hr, Select, SelectValue, SortBy, Space } from 'Vendor/components';

import './UserBookmarks.less';

interface Props {
  userId: string;
  user: UserState;
  bookmarksByKey: BookmarksByKey;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
  followersUsers: UserState[];
  followersUsersLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
}

export const UserBookmarks: React.FC<Props> = ({
  userId,
  user,
  bookmarksByKey,
  bookmarksIds,
  bookmarksLoading,
  followingUsers,
  followingUsersLoading,
  followersUsers,
  followersUsersLoading,
  page,
  totalItems,
  url,
  sort,
  tagsSearchFormatted,
  onInputChange,
  onChange,
  allTags,
  currentQueryParamFilterTags,
}) => (
  <>
    <div className="UserBookmarks">
      <div className="UserBookmarks-header UserBookmarks-headerTitle">
        Bookmarks of
        <Space />
        <A href={`/users/${userId}`} underlined>
          @{user?.name}
        </A>
      </div>
      <div className="UserBookmarks-header">
        <Select
          className="UserBookmarks-select"
          label="Select tags"
          value={currentQueryParamFilterTags}
          defaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
          options={[...tagsSearchFormatted, ...allTags.map((item) => ({ label: item.name, value: item.name }))].filter(
            (v, i, a) => a.findIndex((t) => t.value === v.value) === i
          )}
          onInputChange={onInputChange}
          onChange={onChange}
          maxItems={4}
        />
        <SortBy
          options={[
            { label: 'Rating', field: 'vote' },
            { label: 'Bookmarked', field: 'timesbookmarked' },
            { label: 'Created', field: 'createdAt' },
          ]}
          href={url}
          currentSort={sort}
          loading={bookmarksLoading}
        />
      </div>
      <div className="UserBookmarks-bookmarks">
        {bookmarksLoading ? (
          <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          bookmarksIds?.map((id) => (
            <FadeInOut valueToUpdate={bookmarksByKey[id]?.deleting} appear key={id}>
              {!bookmarksByKey[id]?.deleting && <BookmarkRow id={id} key={id} />}
            </FadeInOut>
          ))
        )}
        {!bookmarksLoading && !bookmarksIds?.length && (
          <span className="UserBookmarks-noResults">ⵁ We didnt find any bookmark.</span>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListUsers
        className="UserBookmarks-sidebarListUsersFirst"
        users={followingUsers}
        title="Following Users"
        href={`users/${userId}/following`}
        loading={followingUsersLoading}
      />
      <SidebarListUsers
        title="Followers"
        href={`users/${userId}/followers`}
        loading={followersUsersLoading}
        users={followersUsers}
      />
    </Sidebar>
  </>
);
