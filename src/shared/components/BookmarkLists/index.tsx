import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { listBookmarkDelete } from 'Modules/Lists/actions/listBookmarkDelete';
import { listCreate } from 'Modules/Lists/actions/listCreate';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsByUserIdAdminOrEditor } from 'Modules/Lists/selectors/selectListsByUserIdAdminOrEditor';
import { selectListsErrorLast } from 'Modules/Lists/selectors/selectListsErrorLast';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { BookmarkLists as BookmarkListsUi } from './BookmarkLists';

interface Props {
  bookmarkId: number;
}

const BookmarkLists: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const [itemsLoading, setItemsLoading] = useState<number[]>([]);
  const [createListSubmitting, setCreateListSubmitting] = useState<boolean>(false);
  const [showCreateList, setShowCreateList] = useState<boolean>(false);
  const [listInputName, setListInputName] = useState<string>(undefined);
  const listError = useSelector(selectListsErrorLast);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [recentlyUpdated, setRecentlyUpdated] = useState<number[]>([]);
  const listsEditable = useSelector((state: RootState) =>
    selectListsByUserIdAdminOrEditor(state, { userId: session?.id })
  );
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId }));
  const lists = listsEditable.map((list) => ({
    ...list,
    isActive: list.linkIds?.includes(bookmark.linkId),
    wasRecentlyUpdated: recentlyUpdated?.includes(list?.id),
  }));

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
    setSubmitError(listError?.message);
  }, [listError]);

  return (
    <BookmarkListsUi
      sessionId={session?.id}
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
      onIconLeave={onIconLeave}
    />
  );
};

export default BookmarkLists;
