import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { selectListsByUserId } from 'Modules/Lists/selectors/selectListsByUserId';
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
  const [mounted, setMounted] = useState<boolean>(false);
  const [inList, setInList] = useState<boolean>(false);
  const [listsLoading, setListsLoading] = useState<number[]>([]);
  const lists = useSelector((state: RootState) => selectListsByUserId(state, { userId: session?.id }));

  const onListEnter = () => {
    setInList(true);
  };

  const onListLeave = () => {
    setMounted(false);
    setInList(false);
  };

  const onListsClick = () => {
    setMounted(!mounted);
  };

  const onListAdd = async ({ listId }) => {
    setListsLoading([...listsLoading, listId]);
    await dispatch(listBookmarkCreate({ listId, bookmarkId }));
    const filteredListLoaders = listsLoading?.filter((item) => item !== listId);
    setListsLoading(filteredListLoaders);
  };

  useEffect(() => {
    const unMountTimeout = setTimeout(() => {
      !inList && setMounted(false);
    }, DELAY_THREE_SEC);

    return () => {
      clearTimeout(unMountTimeout);
    };
  }, [mounted, inList]);

  return (
    <BookmarkListsUi
      bookmarkId={bookmarkId}
      mounted={mounted}
      listsLoading={listsLoading}
      onListLeave={onListLeave}
      onListEnter={onListEnter}
      onListsClick={onListsClick}
      onListAdd={onListAdd}
      lists={lists}
    />
  );
};

export default BookmarkLists;
