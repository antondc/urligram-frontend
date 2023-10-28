import React from 'react';

import BookmarkWithBackground from 'Assets/svg/bookmarkWithBackground.svg';
import PlusCircleWithBackground from 'Assets/svg/plusCircleWithBackground.svg';
import { Spinner } from '@antoniodcorrea/components';

import './BookmarkerNew.less';

interface Props {
  className?: string;
  loading: boolean;
  userBookmarkedLink: boolean;
  onBookmarkGrab: () => void;
  onBookmarkDelete: () => void;
}

export const BookmarkerNew: React.FC<Props> = ({
  className,
  userBookmarkedLink,
  loading,
  onBookmarkGrab,
  onBookmarkDelete,
}) => (
  <div className={'BookmarkerNew' + (className ? ' ' + className : '')}>
    {!loading && !userBookmarkedLink && (
      <BookmarkWithBackground className={'BookmarkerNew-bookmark BookmarkerNew-bookmark--empty'} onClick={onBookmarkGrab} />
    )}
    {!loading && userBookmarkedLink && (
      <>
        <BookmarkWithBackground className="BookmarkerNew-bookmark BookmarkerNew-bookmark--filled" />
        <PlusCircleWithBackground className="BookmarkerNew-remove" onClick={onBookmarkDelete} />
      </>
    )}
    {loading && <Spinner className="BookmarkerNew-loader" />}
  </div>
);
