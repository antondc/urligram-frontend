import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { selectBookmarkListsModal } from 'Modules/Ui/selectors/selectBookmarkListsModal';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { BookmarkListsPopOver as BookmarkListsPopOverUi } from './BookmarkListsPopOver';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';

interface Props {
  bookmarkId: number;
}

export const BookmarkListsPopOver: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();
  const bookmarkListsModal = useSelector(selectBookmarkListsModal);
  const bookmarkListsModalMounted = bookmarkListsModal?.bookmarkId === bookmarkId && !!bookmarkListsModal?.mounted;
  const [inList, setInList] = useState<boolean>(false);
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);

  if (uiScreenTypeIsMobile) return null;

  const onCloseClick = () => {
    dispatch(bookmarkListsModalUnmount());
  };

  const onListEnter = () => {
    setInList(true);
  };

  const onListLeave = () => {
    if (bookmarkListsModal?.loading) return;

    dispatch(bookmarkListsModalUnmount());
    setInList(false);
  };

  useEffect(() => {
    const unMountTimeout = setTimeout(() => {
      !inList && !!bookmarkListsModalMounted && dispatch(bookmarkListsModalUnmount());
    }, DELAY_THREE_SEC);

    return () => {
      clearTimeout(unMountTimeout);
    };
  }, [bookmarkListsModalMounted, inList]);

  return (
    <BookmarkListsPopOverUi
      mounted={bookmarkListsModalMounted}
      bookmarkId={bookmarkId}
      onCloseClick={onCloseClick}
      onListEnter={onListEnter}
      onListLeave={onListLeave}
    />
  );
};

export default BookmarkListsPopOver;
