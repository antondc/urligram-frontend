import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Cross from 'Assets/svg/cross.svg';
import Rating from 'Assets/svg/rating.svg';
import Clock from 'Assets/svg/spinner6.svg';
import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Pagination from 'Components/Pagination';
import { RenderInPortal } from 'Components/Portal';
import Sidebar from 'Components/Sidebar';
import SidebarListUsers from 'Components/SidebarListUsers';
import { BookmarksByKey } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { FadeInOut, Hr, Select, SelectValue, SortBy, Space, Tooltip } from 'Vendor/components';

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
  onAddBookmarkClick: () => void;
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
  onAddBookmarkClick,
  allTags,
  currentQueryParamFilterTags,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · User Bookmarks`} />
    <div className="UserBookmarks">
      <div className="UserBookmarks-header UserBookmarks-headerTitle">
        Bookmarks of
        <Space />
        <A href={`/users/${userId}`} underlined frontend>
          @{user?.name}
        </A>
        <RenderInPortal>
          <Tooltip parentElementId="UserBookmarks-addBookmark" content="Add new bookmark" delay={2} />
        </RenderInPortal>
        <div className="UserBookmarks-addBookmark" id="UserBookmarks-addBookmark" onClick={onAddBookmarkClick}>
          <Cross className="UserBookmarks-iconCross" />
        </div>
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
          hideLabelOnFill
        />
        <SortBy
          className="UserBookmarks-sortBy"
          options={[
            { label: 'Rating', field: 'vote', icon: Rating },
            { label: 'Bookmarked', field: 'timesbookmarked', icon: Bookmark },
            { label: 'Created', field: 'createdAt', icon: Clock },
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
          <div className="UserBookmarks-noResults">ⵁ We didnt find any bookmark.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
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
