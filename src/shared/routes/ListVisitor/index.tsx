import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { loadListById } from 'Modules/Lists/actions/listLoadById';
import { selectListsById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamListId } from 'Modules/Routes/selectors/selectCurrentRouteParamListId';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { bookmarksLoadByListId } from '../../redux/modules/Bookmarks/actions/bookmarksLoadByListId';
import { ListVisitor as ListVisitorUI } from './ListVisitor';

const ListVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const mostFollowedLists = useSelector(selectPopularLists);
  const mostFollowedListsLoading = useSelector(selectPopularListsLoading);
  const listId = useSelector(selectCurrentRouteParamListId);
  const list = useSelector((state: RootState) => selectListsById(state, { id: listId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);

  useEffect(() => {
    dispatch(loadListById(listId));
    dispatch(bookmarksLoadByListId(listId));
    dispatch(loadPopularLists());
  }, []);

  return (
    <ListVisitorUI
      list={list}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      mostFollowedLists={mostFollowedLists}
      mostFollowedListsLoading={mostFollowedListsLoading}
    />
  );
};

export default ListVisitor;
