import React from 'react';
import Helmet from 'react-helmet';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import Main from 'Components/Main';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';

import './Home.less';

export interface Props {
  bookmarksIds: number[];
  bookmarksIdsLoading: boolean;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  url: string;
}

export const Home: React.FC<Props> = ({ bookmarksIds, bookmarksIdsLoading, page, totalItems, url }) => (
  <Main className="Home">
    <Helmet title={`${SITE_TITLE} · Home`} />
    <div className="Home-bookmarks">
      {bookmarksIdsLoading ? (
        <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        bookmarksIds?.map((id) => (
          <CardItem key={id}>
            <BookmarkRow id={id} />
          </CardItem>
        ))
      )}
      {!bookmarksIdsLoading && !bookmarksIds?.length && (
        <NoResults content="ⵁ Start following users to receive recommended bookmarks." />
      )}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </Main>
);
