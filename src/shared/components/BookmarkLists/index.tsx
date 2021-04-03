import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { listCreate } from 'Modules/Lists/actions/listCreate';
import { selectListsByUserId } from 'Modules/Lists/selectors/selectListsByUserId';
import { selectListsErrorLast } from 'Modules/Lists/selectors/selectListsErrorLast';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { BookmarkLists as BookmarkListsUi } from './BookmarkLists';

interface Props {
  bookmarkId: number;
}

export const BookmarkLists: React.FC<Props> = ({ bookmarkId }) => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const [itemsLoading, setItemsLoading] = useState<number[]>([]);
  const [mounted, setMounted] = useState<boolean>(undefined);
  const [showCreateList, setShowCreateList] = useState<boolean>(false);
  const [listInputName, setListInputName] = useState<string>(undefined);
  const listError = useSelector(selectListsErrorLast);
  const [submitError, setSubmitError] = useState<string>(undefined);

  const [inList, setInList] = useState<boolean>(false);
  const lists = useSelector((state: RootState) => selectListsByUserId(state, { userId: session?.id }));

  const onListEnter = () => {
    setInList(true);
  };

  const onListLeave = () => {
    setSubmitError(undefined);
    setListInputName(undefined);

    setMounted(false);
    setInList(false);
  };

  const onListsClick = () => {
    setMounted(!mounted);
  };

  const onListAddBookmark = async (listId: number) => {
    setItemsLoading([...itemsLoading, listId]);
    await dispatch(listBookmarkCreate({ listId, bookmarkId }));
    setItemsLoading(itemsLoading.filter((item) => item !== listId));
  };

  const onListTitleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setSubmitError(undefined);

    setListInputName(value);
  };

  const onCreateListSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const data = {
      listName: listInputName,
      listDescription: '',
      listIsPrivate: false,
    };

    await dispatch(listCreate(data));
    setShowCreateList(false);
    setListInputName(undefined);
  };

  const onShowCreateList = async () => {
    setShowCreateList(!showCreateList);
    setShowCreateList(true);
  };

  useEffect(() => {
    const unMountTimeout = setTimeout(() => {
      !inList && setMounted(false);
    }, DELAY_THREE_SEC);

    return () => {
      clearTimeout(unMountTimeout);
    };
  }, [mounted, inList]);

  useEffect(() => {
    setSubmitError(listError?.message);
  }, [listError]);

  return (
    <BookmarkListsUi
      bookmarkId={bookmarkId}
      mounted={mounted}
      onListLeave={onListLeave}
      onListEnter={onListEnter}
      onListsClick={onListsClick}
      onListAddBookmark={onListAddBookmark}
      onCreateListSubmit={onCreateListSubmit}
      listInputName={listInputName}
      submitError={submitError}
      lists={lists}
      itemsLoading={itemsLoading}
      onListTitleInputChange={onListTitleInputChange}
      showCreateList={showCreateList}
      onShowCreateList={onShowCreateList}
    />
  );
};

export default BookmarkLists;
