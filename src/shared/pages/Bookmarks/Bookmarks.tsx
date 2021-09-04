import React from 'react';
import Helmet from 'react-helmet';

import Clock from 'Assets/svg/spinner6.svg';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import Main from 'Components/Main';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { Select, SelectValue, SortBy } from 'Vendor/components';

import './Bookmarks.less';

interface Props {
  url: string;
  bookmarksIds: number[];
  loading: boolean;
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
  <Main className="Bookmarks">
    <Helmet title={`${SITE_TITLE} · Bookmarks`} />
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
        options={[{ label: 'Created at', field: 'createdAt', icon: Clock }]}
        href={url}
        currentSort={sort}
        loading={loading}
      />
    </div>
    <div className="Bookmarks-bookmarks">
      {loading ? (
        <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        bookmarksIds?.map((id) => (
          <CardItem key={id}>
            <BookmarkRow id={id} />
          </CardItem>
        ))
      )}
      {!loading && !bookmarksIds?.length && <NoResults content="ⵁ We didnt find any bookmark." />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </Main>
);
