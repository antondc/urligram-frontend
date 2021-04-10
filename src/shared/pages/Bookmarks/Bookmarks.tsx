import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Border, FadeInOut, Flex, Hr, Select, SelectValue, SortBy, Span } from '@antoniodcorrea/components';

import './Bookmarks.less';

interface Props {
  url: string;
  bookmarksIds: number[];
  popularLists: ListState[];
  loading: boolean;
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
  url,
  bookmarksIds,
  loading,
  page,
  totalItems,
  sort,
  tagsSearchFormatted,
  onInputChange,
  allTags,
  currentQueryParamFilterTags,
  onChange,
}) => (
  <div className="Bookmarks">
    <Flex horizontal="between" vertical="top">
      <Main>
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
          />
          <SortBy
            options={[
              { label: 'Created at', field: 'createdAt' },
              { label: 'Rating', field: 'vote' },
            ]}
            href={url}
            currentSort={sort}
          />
        </Flex>
        <Hr spacer size="small" />
        <Border grow>
          <FadeInOut valueToUpdate={loading} speed="fastest" appear>
            {loading ? (
              <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              bookmarksIds?.map((id, index) => (
                <React.Fragment key={id}>
                  {!!index && <Hr spacer size="small" />}
                  <BookmarkRow id={id} />
                </React.Fragment>
              ))
            )}
            {!loading && !bookmarksIds?.length && <Span bold>ⵁ We didnt find any bookmark.</Span>}
          </FadeInOut>
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        {/* <SidebarListTags title="Trending Tags" items={tags} />
        <Hr spacer />
        <SidebarListUsers title="Popular Users" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Following" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Followers" items={users} /> */}
      </Sidebar>
    </Flex>
  </div>
);
