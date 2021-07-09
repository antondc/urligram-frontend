import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { selectBookmarkListsModal } from 'Modules/Ui/selectors/selectBookmarkListsModal';
import { selectBookmarkListsModalMounted } from 'Modules/Ui/selectors/selectBookmarkListsModalMounted';
import { BookmarkLists as BookmarkListsUi } from './BookmarkLists';

interface Props {
  bookmarkId: number;
}

export const BookmarkLists: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const bookmarkListModalsMounted = useSelector(selectBookmarkListsModalMounted);
  const bookmarkListsModal = useSelector(selectBookmarkListsModal);
  const modalMounted = !!bookmarkListsModal?.bookmarkId;

  const onCloseClick = () => {
    if (bookmarkListModalsMounted) return;

    dispatch(bookmarkListsModalUnmount());
  };

  return <BookmarkListsUi bookmarkId={bookmarkId} modalMounted={modalMounted} onCloseClick={onCloseClick} />;
};

export default BookmarkLists;
