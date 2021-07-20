import React from 'react';

import BaseSheet from 'Components/BaseSheet';
import BookmarkLists from 'Components/BookmarkLists';
import BookmarkListsPopOver from 'Components/BookmarkListsPopOver';

import './BookmarkListsPopOverOrSheet.less';

interface Props {
  bookmarkId: number;
  shouldMount: boolean;
  uiScreenTypeIsMobile: boolean;
  onCloseClick: () => void;
}

export const BookmarkListsPopOverOrSheet: React.FC<Props> = ({
  bookmarkId,
  shouldMount,
  uiScreenTypeIsMobile,
  onCloseClick,
}) => {
  if (uiScreenTypeIsMobile) {
    return (
      <BaseSheet mounted={shouldMount} onCloseClick={onCloseClick}>
        <div className="BookmarkListsPopOverOrSheet">
          <div className="BookmarkListsPopOverOrSheet-title">My Lists</div>
          <BookmarkLists bookmarkId={bookmarkId} />
        </div>
      </BaseSheet>
    );
  }

  return <BookmarkListsPopOver bookmarkId={bookmarkId} />;
};

export default BookmarkListsPopOverOrSheet;
