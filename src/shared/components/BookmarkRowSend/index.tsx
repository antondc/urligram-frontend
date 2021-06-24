import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { bookmarkSendCreate } from 'Modules/Shared/actions/bookmarkSendCreate';
import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { bookmarkSendModalMount } from 'Modules/Ui/actions/bookmarksSendModalMount';
import { bookmarkSendModalUnmount } from 'Modules/Ui/actions/bookmarksSendModalUnmount';
import { selectBookmarkSendModal } from 'Modules/Ui/selectors/selectBookmarkSendModal';
import { selectBookmarkSendModalsMounted } from 'Modules/Ui/selectors/selectBookmarkSendModalsMounted';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { selectUsersByIds } from 'Modules/Users/selectors/selectUsersByIds';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { BookmarkRowSend as BookmarkRowSendUi } from './BookmarkRowSend';

interface Props {
  bookmarkId: number;
}

export const BookmarkRowSend: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId: bookmarkId }));
  const [itemsLoading, setItemsLoading] = useState<string[]>([]);
  const bookmarkSendModalsMounted = useSelector(selectBookmarkSendModalsMounted);
  const bookmarkSendModal = useSelector((state: RootState) => selectBookmarkSendModal(state, { bookmarkId }));
  const modalMounted = !!bookmarkSendModal?.bookmarkId;
  const [recentlyUpdated, setRecentlyUpdated] = useState<string[]>([]);
  const [inList, setInList] = useState<boolean>(false);
  const user = useSelector((state: RootState) => selectUserById(state, { id: session?.id }));
  const followingUsers = useSelector((state: RootState) => selectUsersByIds(state, { userIds: user?.following }));

  const onListEnter = () => {
    setInList(true);
  };

  const onListLeave = () => {
    if (itemsLoading?.length) {
      return;
    }

    dispatch(bookmarkSendModalUnmount({ bookmarkId }));
    setInList(false);
  };

  const onListsClick = () => {
    if (bookmarkSendModalsMounted.length) return;

    !!modalMounted && dispatch(bookmarkSendModalUnmount({ bookmarkId }));
    !modalMounted && dispatch(bookmarkSendModalMount({ bookmarkId }));
  };

  const onBookmarkSend = async (userId: string) => {
    setItemsLoading([...itemsLoading, userId]);
    await dispatch(bookmarkSendCreate({ bookmarkId: bookmark?.id, userId }));
    setItemsLoading(itemsLoading.filter((item) => item !== userId));
    // setRecentlyUpdated([...recentlyUpdated, userId]);
  };

  const onIconLeave = async (listId) => {
    setRecentlyUpdated(recentlyUpdated?.filter((item) => item !== listId));
  };

  useEffect(() => {
    const unMountTimeout = setTimeout(() => {
      !inList && !!modalMounted && dispatch(bookmarkListsModalUnmount({ bookmarkId }));
    }, DELAY_THREE_SEC);

    return () => {
      clearTimeout(unMountTimeout);
    };
  }, [modalMounted, inList]);

  return (
    <BookmarkRowSendUi
      sessionId={session?.id}
      bookmark={bookmark}
      mounted={modalMounted}
      onListLeave={onListLeave}
      onListEnter={onListEnter}
      onListsClick={onListsClick}
      onBookmarkSend={onBookmarkSend}
      followingUsers={followingUsers}
      itemsLoading={itemsLoading}
      recentlyUpdated={recentlyUpdated}
      onIconLeave={onIconLeave}
    />
  );
};

export default BookmarkRowSend;
