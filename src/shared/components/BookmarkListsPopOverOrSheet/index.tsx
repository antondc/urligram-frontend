import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { selectBookmarkListsModal } from 'Modules/Ui/selectors/selectBookmarkListsModal';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { BookmarkListsPopOverOrSheet as BookmarkListsPopOverOrSheetUi } from './BookmarkListsPopOverOrSheet';

interface Props {
  bookmarkId: number;
}

const BookmarkListsPopOverOrSheet: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const bookmarkListsModal = useSelector(selectBookmarkListsModal);
  const shouldMount = bookmarkListsModal?.mounted && bookmarkListsModal?.bookmarkId === bookmarkId;

  const onCloseClick = () => {
    dispatch(bookmarkListsModalUnmount());
  };

  return (
    <BookmarkListsPopOverOrSheetUi
      bookmarkId={bookmarkId}
      uiScreenTypeIsMobile={uiScreenTypeIsMobile}
      shouldMount={shouldMount}
      onCloseClick={onCloseClick}
    />
  );
};

export default BookmarkListsPopOverOrSheet;
