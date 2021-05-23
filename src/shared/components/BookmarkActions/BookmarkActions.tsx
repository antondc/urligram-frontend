import React from 'react';

import { BookmarkWithBackground, PlusCircleWithBackground, SpinnerLoader } from 'Vendor/components';

import './BookmarkActions.less';

interface Props {
  className?: string;
  loading: boolean;
  isOwnBookmark: boolean;
  userBookmarkedLink: boolean;
  onBookmarkGrab: () => void;
  onBookmarkDelete: () => void;
}

export const BookmarkActions: React.FC<Props> = ({
  className,
  isOwnBookmark,
  userBookmarkedLink,
  loading,
  onBookmarkGrab,
  onBookmarkDelete,
}) => (
  <div className={'BookmarkActions' + (className ? ' ' + className : '')}>
    {!loading && !isOwnBookmark && !userBookmarkedLink && (
      <BookmarkWithBackground
        className={'BookmarkActions-bookmark BookmarkActions-bookmarkEmpty'}
        size="small"
        onClick={onBookmarkGrab}
      />
    )}
    {!loading && userBookmarkedLink && (
      <>
        <BookmarkWithBackground className="BookmarkActions-bookmarked" size="small" />
        <PlusCircleWithBackground className="BookmarkActions-bookmarkRemove" size="small" onClick={onBookmarkDelete} />
      </>
    )}
    {loading && <SpinnerLoader className="BookmarkActions-loader" size="small" />}
  </div>
);

export default BookmarkActions;
