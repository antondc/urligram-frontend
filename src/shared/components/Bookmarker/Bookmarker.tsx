import React from 'react';

import BookmarkWithBackground from 'Assets/svg/bookmarkWithBackground.svg';
import PlusCircleWithBackground from 'Assets/svg/plusCircleWithBackground.svg';
import { SpinnerPie } from 'Vendor/components';

import './Bookmarker.less';

interface Props {
  className?: string;
  loading: boolean;
  isOwnBookmark: boolean;
  userBookmarkedLink: boolean;
  onBookmarkGrab: () => void;
  onBookmarkDelete: () => void;
}

export const Bookmarker: React.FC<Props> = ({
  className,
  isOwnBookmark,
  userBookmarkedLink,
  loading,
  onBookmarkGrab,
  onBookmarkDelete,
}) => (
  <div className={'Bookmarker' + (className ? ' ' + className : '')}>
    {!loading && !isOwnBookmark && !userBookmarkedLink && (
      <BookmarkWithBackground className={'Bookmarker-bookmark Bookmarker-bookmark--empty'} onClick={onBookmarkGrab} />
    )}
    {!loading && (userBookmarkedLink || isOwnBookmark) && (
      <>
        <BookmarkWithBackground className="Bookmarker-bookmark Bookmarker-bookmark--filled" />
        <PlusCircleWithBackground className="Bookmarker-remove" onClick={onBookmarkDelete} />
      </>
    )}
    {loading && <SpinnerPie className="Bookmarker-loader" />}
  </div>
);
