import React from 'react';
import { useDispatch } from 'react-redux';

import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { BookmarkListsModal as BookmarkListsModalUi } from './BookmarkListsModal';

interface Props {
  bookmarkId: number;
}

export const BookmarkListsModal: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const onCloseClick = () => {
    dispatch(bookmarkListsModalUnmount());
  };

  // TODO: maybe lock screen here on useEffect

  return <BookmarkListsModalUi bookmarkId={bookmarkId} onCloseClick={onCloseClick} />;
};

export default BookmarkListsModal;
