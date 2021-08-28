import React from 'react';

import Rating from 'Assets/svg/rating.svg';
import Clock from 'Assets/svg/spinner6.svg';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListBookmarks from 'Components/SidebarListBookmarks';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Select, SelectValue, SortBy } from 'Vendor/components';

import './Bookmarks.less';

interface Props {
  session: SessionState;
  url: string;
  bookmarksIds: number[];
  loading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  myRecentBookmarks: BookmarkState[];
  myRecentBookmarksLoading: boolean;
  popularLists: ListState[];
  popularListsLoading: boolean;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
}

export const Bookmarks: React.FC<Props> = ({
  session,
  url,
  bookmarksIds,
  loading,
  mostUsedTags,
  mostUsedTagsLoading,
  myRecentBookmarks,
  myRecentBookmarksLoading,
  page,
  totalItems,
  sort,
  tagsSearchFormatted,
  onInputChange,
  allTags,
  currentQueryParamFilterTags,
  onChange,
  popularLists,
  popularListsLoading,
}) => (
  <>
    <div className="Bookmarks">
      <div className="Bookmarks-header">
        <Select
          className="Bookmarks-select"
          label="Select tags"
          value={currentQueryParamFilterTags}
          defaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
          options={[...tagsSearchFormatted, ...allTags.map((item) => ({ label: item.name, value: item.name }))].filter(
            (v, i, a) => a.findIndex((t) => t.value === v.value) === i
          )}
          onInputChange={onInputChange}
          onChange={onChange}
          maxItems={4}
          grow
          hideLabelOnFill
        />
        <SortBy
          className="Bookmarks-sortBy"
          options={[
            { label: 'Created at', field: 'createdAt', icon: Clock },
            { label: 'Rating', field: 'vote', icon: Rating },
          ]}
          href={url}
          currentSort={sort}
          loading={loading}
        />
      </div>
      <div className="Bookmarks-bookmarks">
        {loading ? (
          <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
        )}
        {!loading && !bookmarksIds?.length && <div className="Bookmarks-noResults">ⵁ We didnt find any bookmark.</div>}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
    </div>
    <Sidebar>
      {!!session?.id && (
        <SidebarListBookmarks
          className="Bookmarks-myRecentBookmarks"
          title="My recent bookmarks"
          loading={myRecentBookmarksLoading}
          bookmarks={myRecentBookmarks}
        />
      )}
      <SidebarListTags
        title="Most Followed Tags"
        loading={mostUsedTagsLoading}
        tags={mostUsedTags}
        tagsPathname="/bookmarks"
      />
      <SidebarListLists
        title="Popular lists"
        lists={popularLists}
        loading={popularListsLoading}
        href="/lists?sort=-members"
      />
    </Sidebar>
  </>
);
