import React from 'react';
import { useDispatch } from 'react-redux';

import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { uiScreenUnLock } from 'Modules/Ui/actions/uiScreenUnLock';
import { BookmarkListsSheet as BookmarkListsSheetUi } from './BookmarkListsSheet';

interface Props {
  bookmarkId: number;
}

export const BookmarkListsSheet: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const onCloseClick = () => {
    dispatch(uiScreenUnLock());
    dispatch(bookmarkListsModalUnmount());
  };

  // TODO: maybe lock screen here on useEffect
  return <BookmarkListsSheetUi bookmarkId={bookmarkId} onCloseClick={onCloseClick} />;
};

export default BookmarkListsSheet;
