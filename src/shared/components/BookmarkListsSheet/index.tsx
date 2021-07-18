import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { BookmarkListsSheet as BookmarkListsSheetUi } from './BookmarkListsSheet';

interface Props {
  bookmarkId: number;
}

export const BookmarkListsSheet: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const onCloseClick = () => {
    dispatch(uiScreenMobileUnLock());
    dispatch(bookmarkListsModalUnmount());
  };

  useEffect(() => {
    dispatch(uiScreenMobileLock());
  }, []);

  return <BookmarkListsSheetUi bookmarkId={bookmarkId} onCloseClick={onCloseClick} />;
};

export default BookmarkListsSheet;
