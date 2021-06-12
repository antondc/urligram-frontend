import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
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
import { Flex, Frame, Hr, Select, SelectValue, SortBy, Span } from 'Vendor/components';

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
  // ---
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
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
  <div className="Bookmarks">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame grow padding="none" shadow={false} borderBottom={false}>
          <Flex horizontal="between" noWrap>
            <Select
              className="Bookmarks-select"
              label="Select tags"
              value={currentQueryParamFilterTags}
              defaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
              options={[
                ...tagsSearchFormatted,
                ...allTags.map((item) => ({ label: item.name, value: item.name })),
              ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)}
              onInputChange={onInputChange}
              onChange={onChange}
              maxItems={4}
              grow
            />
            <SortBy
              options={[
                { label: 'Created at', field: 'createdAt' },
                { label: 'Rating', field: 'vote' },
              ]}
              href={url}
              currentSort={sort}
              loading={loading}
            />
          </Flex>
        </Frame>
        <Frame grow padding="small">
          <MainContent>
            {loading ? (
              <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
            )}
            {!loading && !bookmarksIds?.length && <Span weight="semiBold">ⵁ We didnt find any bookmark.</Span>}
          </MainContent>
        </Frame>
        <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      </Main>
      <Sidebar>
        {!!session?.id && (
          <SidebarListBookmarks
            title="My recent bookmarks"
            loading={myRecentBookmarksLoading}
            bookmarks={myRecentBookmarks}
          />
        )}
        <SidebarListTags title="Most Followed Tags" loading={mostUsedTagsLoading} tags={mostUsedTags} />
        <SidebarListLists
          title="Popular lists"
          lists={popularLists}
          loading={popularListsLoading}
          href="/lists?sort=-members"
        />
      </Sidebar>
    </Flex>
  </div>
);
