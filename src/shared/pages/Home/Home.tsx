import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmark.svg';
import Clock from 'Assets/svg/spinner6.svg';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import SubHeader from 'Components/SubHeader';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { SelectValue } from '@antoniodcorrea/components';

import './Home.less';

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

export const Home: React.FC<Props> = ({
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
  <>
    <Helmet>
      <title>{`${SITE_TITLE}`} · Home</title>
    </Helmet>
    <div className="Home">
      <SubHeader
        // title props
        title="All Bookmarks"
        leftIcon={<Bookmark />}
        // select props
        selectPlaceholder="Select tags"
        currentQueryParamFilterTags={currentQueryParamFilterTags}
        selectDefaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
        selectOptions={[
          ...tagsSearchFormatted,
          ...allTags.map((item) => ({ label: item.name, value: item.name })),
        ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)}
        onSelectInputChange={onInputChange}
        onSelectChange={onChange}
        // sort props
        sortLoading={loading}
        sortByOptions={[{ label: 'Created at', field: 'createdAt', icon: Clock }]}
        url={url}
        currentSort={sort}
      />
      <div />
      <div className="Home-bookmarks">
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
    </div>
  </>
);
