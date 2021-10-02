import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectBookmarksWithSimilarLinkId } from 'Modules/Bookmarks/selectors/selectBookmarksWithSimilarLinkId';
import { RootState } from 'Modules/rootType';
import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { selectBookmarkListsModal } from 'Modules/Ui/selectors/selectBookmarkListsModal';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { BookmarkListsPopOver as BookmarkListsPopOverUi } from './BookmarkListsPopOver';

interface Props {
  bookmarkId: number;
}

const BookmarkListsPopOver: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId }));
  const bookmarkListsModal = useSelector(selectBookmarkListsModal);
  // We need to allow mounting this modal to all bookmarks sharing same linkId.
  // 1. Retrieve all bookmarks with same link id
  // 2. Check if the mounted bookmark is in the list of all bookmarks sharing this link id
  // 2. Mount accordingly
  const bookmarksWithSimilarLinkId = useSelector((state: RootState) =>
    selectBookmarksWithSimilarLinkId(state, { linkId: bookmark?.linkId })
  );
  const bookmarksWithSimilarLinkIdIds = bookmarksWithSimilarLinkId?.map((item) => item?.id);
  const bookmarkListsModalIdIsInBookmarks = bookmarksWithSimilarLinkIdIds?.includes(bookmarkListsModal?.bookmarkId);
  const bookmarkListsModalMounted = bookmarkListsModalIdIsInBookmarks && !!bookmarkListsModal?.mounted;
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
