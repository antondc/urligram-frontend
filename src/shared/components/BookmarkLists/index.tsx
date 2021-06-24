import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { listBookmarkDelete } from 'Modules/Lists/actions/listBookmarkDelete';
import { listCreate } from 'Modules/Lists/actions/listCreate';
import { selectListsByUserId } from 'Modules/Lists/selectors/selectListsByUserId';
import { selectListsErrorLast } from 'Modules/Lists/selectors/selectListsErrorLast';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { bookmarkListsModalMount } from 'Modules/Ui/actions/bookmarkListsModalMount';
import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { selectBookmarkListsModal } from 'Modules/Ui/selectors/selectBookmarkListsModal';
import { selectBookmarkListsModalsMounted } from 'Modules/Ui/selectors/selectBookmarkListsModalsMounted';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { BookmarkLists as BookmarkListsUi } from './BookmarkLists';

interface Props {
  bookmarkId: number;
}

export const BookmarkLists: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const [itemsLoading, setItemsLoading] = useState<number[]>([]);
  const [createListSubmitting, setCreateListSubmitting] = useState<boolean>(false);
  const bookmarkListsModalsMounted = useSelector(selectBookmarkListsModalsMounted);
  const bookmarkListsModal = useSelector((state: RootState) => selectBookmarkListsModal(state, { bookmarkId }));
  const modalMounted = !!bookmarkListsModal?.bookmarkId;
  const [showCreateList, setShowCreateList] = useState<boolean>(false);
  const [listInputName, setListInputName] = useState<string>(undefined);
  const listError = useSelector(selectListsErrorLast);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [recentlyUpdated, setRecentlyUpdated] = useState<number[]>([]);
  const [inList, setInList] = useState<boolean>(false);
  const lists = useSelector((state: RootState) => selectListsByUserId(state, { userId: session?.id }));

  const onListEnter = () => {
    setInList(true);
  };

  const onListLeave = () => {
    if (itemsLoading?.length) {
      return;
    }

    setSubmitError(undefined);
    setListInputName(undefined);
    dispatch(bookmarkListsModalUnmount({ bookmarkId }));
    setInList(false);
  };

  const onListsClick = () => {
    if (bookmarkListsModalsMounted.length) return;

    !!modalMounted && dispatch(bookmarkListsModalUnmount({ bookmarkId }));
    !modalMounted && dispatch(bookmarkListsModalMount({ bookmarkId }));
  };

  const onListAddBookmark = async (listId: number) => {
    setItemsLoading([...itemsLoading, listId]);
    await dispatch(listBookmarkCreate({ listId, bookmarkId }));
    setItemsLoading(itemsLoading.filter((item) => item !== listId));
    setRecentlyUpdated([...recentlyUpdated, listId]);
  };

  const onListDeleteBookmark = async (listId: number) => {
    setItemsLoading([...itemsLoading, listId]);
    await dispatch(listBookmarkDelete({ listId, bookmarkId }));
    setItemsLoading(itemsLoading.filter((item) => item !== listId));
    setRecentlyUpdated([...recentlyUpdated, listId]);
  };

  const onListTitleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setSubmitError(undefined);

    setListInputName(value);
  };

  const onCreateListSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setCreateListSubmitting(true);
    const data = {
      listName: listInputName,
      listDescription: '',
      listIsPrivate: false,
    };

    await dispatch(listCreate(data));
    setShowCreateList(false);
    setCreateListSubmitting(false);
    setListInputName(undefined);
  };

  const onShowCreateList = async () => {
    setShowCreateList(!showCreateList);
    setShowCreateList(true);
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

  useEffect(() => {
    setSubmitError(listError?.message);
  }, [listError]);

  return (
    <BookmarkListsUi
      sessionId={session?.id}
      bookmarkId={bookmarkId}
      mounted={modalMounted}
      onListLeave={onListLeave}
      onListEnter={onListEnter}
      onListsClick={onListsClick}
      onListAddBookmark={onListAddBookmark}
      onListDeleteBookmark={onListDeleteBookmark}
      onCreateListSubmit={onCreateListSubmit}
      listInputName={listInputName}
      submitError={submitError}
      lists={lists}
      itemsLoading={itemsLoading}
      onListTitleInputChange={onListTitleInputChange}
      showCreateList={showCreateList}
      createListSubmitting={createListSubmitting}
      onShowCreateList={onShowCreateList}
      recentlyUpdated={recentlyUpdated}
      onIconLeave={onIconLeave}
    />
  );
};

export default BookmarkLists;
