import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { listBookmarkDelete } from 'Modules/Lists/actions/listBookmarkDelete';
import { listCreate } from 'Modules/Lists/actions/listCreate';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsByUserIdAdminOrEditor } from 'Modules/Lists/selectors/selectListsByUserIdAdminOrEditor';
import { selectListsErrorLast } from 'Modules/Lists/selectors/selectListsErrorLast';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { selectBookmarkListsModal } from 'Modules/Ui/selectors/selectBookmarkListsModal';
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
  const bookmarkListsModal = useSelector(selectBookmarkListsModal);
  const modalMounted = !!bookmarkListsModal?.bookmarkId;
  const [showCreateList, setShowCreateList] = useState<boolean>(false);
  const [listInputName, setListInputName] = useState<string>(undefined);
  const listError = useSelector(selectListsErrorLast);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [recentlyUpdated, setRecentlyUpdated] = useState<number[]>([]);
  const [inList, setInList] = useState<boolean>(false);
  const listsEditable = useSelector((state: RootState) =>
    selectListsByUserIdAdminOrEditor(state, { userId: session?.id })
  );

  const onListEnter = () => {
    setInList(true);
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
    dispatch(bookmarkListsModalUnmount());
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
    await dispatch(listsLoadByUserId({ userId: session?.id, rawData: true }));

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
      !inList && !!modalMounted && dispatch(bookmarkListsModalUnmount());
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
      onListEnter={onListEnter}
      onListAddBookmark={onListAddBookmark}
      onListDeleteBookmark={onListDeleteBookmark}
      onCreateListSubmit={onCreateListSubmit}
      listInputName={listInputName}
      submitError={submitError}
      lists={listsEditable}
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
