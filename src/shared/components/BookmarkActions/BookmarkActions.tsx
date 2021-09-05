import React from 'react';

import BookmarkWithBackground from 'Assets/svg/bookmarkWithBackground.svg';
import PlusCircleWithBackground from 'Assets/svg/plusCircleWithBackground.svg';
import { SpinnerPie } from 'Vendor/components';

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
        className={'BookmarkActions-bookmark BookmarkActions-bookmark--empty'}
        onClick={onBookmarkGrab}
      />
    )}
    {!loading && (userBookmarkedLink || isOwnBookmark) && (
      <>
        <BookmarkWithBackground className="BookmarkActions-bookmark BookmarkActions-bookmark--filled" />
        <PlusCircleWithBackground className="BookmarkActions-remove" onClick={onBookmarkDelete} />
      </>
    )}
    {loading && <SpinnerPie className="BookmarkActions-loader" />}
  </div>
);

export default BookmarkActions;
