import React from 'react';

import BookmarkWithBackground from 'Assets/svg/bookmarkWithBackground.svg';
import PlusCircleWithBackground from 'Assets/svg/plusCircleWithBackground.svg';
import { SpinnerCircularBrute } from 'Vendor/components';

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
        onClick={onBookmarkGrab}
      />
    )}
    {!loading && (userBookmarkedLink || isOwnBookmark) && (
      <>
        <BookmarkWithBackground className="BookmarkActions-bookmarked" />
        <PlusCircleWithBackground className="BookmarkActions-bookmarkRemove" onClick={onBookmarkDelete} />
      </>
    )}
    {loading && <SpinnerCircularBrute className="BookmarkActions-loader" size="small" />}
  </div>
);

export default BookmarkActions;
