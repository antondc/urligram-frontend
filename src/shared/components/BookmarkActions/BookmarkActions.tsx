import React from 'react';

import {
  BookmarkFilled,
  BookmarkWithBackground,
  EditCircle,
  PlusCircleWithBackground,
  SpinnerLoader,
} from 'Vendor/components';

import './BookmarkActions.less';

interface Props {
  className?: string;
  loading: boolean;
  isOwnBookmark: boolean;
  userBookmarkedLink: boolean;
  onBookmarkGrab: () => void;
  onBookmarkDelete: () => void;
  onEdit: () => void;
}

export const BookmarkActions: React.FC<Props> = ({
  className,
  isOwnBookmark,
  userBookmarkedLink,
  loading,
  onBookmarkGrab,
  onBookmarkDelete,
  onEdit,
}) => (
  <div className={'BookmarkActions' + (className ? ' ' + className : '')}>
    {!loading && isOwnBookmark && (
      <>
        <BookmarkFilled className="BookmarkActions-bookmark BookmarkActions-bookmarkFilled" />
        <EditCircle className="BookmarkActions-edit" size="medium" onClick={onEdit} />
      </>
    )}
    {!loading && !isOwnBookmark && !userBookmarkedLink && (
      <BookmarkWithBackground
        className={'BookmarkActions-bookmark BookmarkActions-bookmarkEmpty'}
        onClick={onBookmarkGrab}
      />
    )}
    {!loading && !isOwnBookmark && userBookmarkedLink && (
      <>
        <BookmarkWithBackground className="BookmarkActions-bookmarked" />
        <PlusCircleWithBackground className="BookmarkActions-bookmarkRemove" onClick={onBookmarkDelete} />
      </>
    )}
    {loading && <SpinnerLoader className="BookmarkActions-loader" size="nano" />}
  </div>
);

export default BookmarkActions;
