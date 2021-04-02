import React from 'react';

import {
  BookmarkFilled,
  BookmarkWithBackground,
  EditCircle,
  PlusCircleWithBackground,
  SpinnerLoader,
} from '@antoniodcorrea/components';

import './BookmarkButton.less';

interface Props {
  className?: string;
  loading: boolean;
  isOwnBookmark: boolean;
  userBookmarkedLink: boolean;
  onBookmarkGrab: () => void;
  onBookmarkDelete: () => void;
  onEdit: () => void;
}

export const BookmarkButton: React.FC<Props> = ({
  className,
  isOwnBookmark,
  userBookmarkedLink,
  loading,
  onBookmarkGrab,
  onBookmarkDelete,
  onEdit,
}) => (
  <div className={'BookmarkButton' + (className ? ' ' + className : '')}>
    {!loading && isOwnBookmark && (
      <>
        <BookmarkFilled className="BookmarkButton-bookmark BookmarkButton-bookmarkFilled" />
        <EditCircle className="BookmarkButton-edit" size="medium" onClick={onEdit} />
      </>
    )}
    {!loading && !isOwnBookmark && !userBookmarkedLink && (
      <BookmarkWithBackground
        className={'BookmarkButton-bookmark BookmarkButton-bookmarkEmpty'}
        onClick={onBookmarkGrab}
      />
    )}
    {!loading && !isOwnBookmark && userBookmarkedLink && (
      <>
        <BookmarkWithBackground className="BookmarkButton-bookmarked" />
        <PlusCircleWithBackground className="BookmarkButton-bookmarkRemove" onClick={onBookmarkDelete} />
      </>
    )}
    {loading && <SpinnerLoader className="BookmarkButton-loader" size="nano" />}
  </div>
);

export default BookmarkButton;
