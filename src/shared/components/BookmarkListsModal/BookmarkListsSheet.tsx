import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import BookmarkLists from '../BookmarkLists';

import './BookmarkListsSheet.less';

interface Props {
  bookmarkId: number;
  onCloseClick: () => void;
}

export const BookmarkListsSheet: React.FC<Props> = ({ bookmarkId, onCloseClick }) => (
  <div className="BookmarkListsSheet">
    <div className="BookmarkListsSheet-content">
      <Cross className="BookmarkListsSheet-cross" onClick={onCloseClick} />
      <h3 className="BookmarkListsSheet-title">My Lists</h3>
      <BookmarkLists bookmarkId={bookmarkId} />
    </div>
  </div>
);

export default BookmarkListsSheet;
