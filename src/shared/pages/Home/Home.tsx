import React from 'react';
import Helmet from 'react-helmet';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
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
  <div className="Home">
    <Helmet title={`${SITE_TITLE} · Home`} />
    <div className="Home-bookmarks">
      {bookmarksIdsLoading ? (
        <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        bookmarksIds?.map((id) => (
          <div className="Home-bookmarksItem" key={id}>
            <BookmarkRow id={id} />
          </div>
        ))
      )}
      {!bookmarksIdsLoading && !bookmarksIds?.length && (
        <div className="Home-noResults">ⵁ Start following users to receive recommended bookmarks.</div>
      )}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </div>
);
