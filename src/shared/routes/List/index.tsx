import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { loadListById } from 'Modules/Lists/actions/listLoadById';
import { selectListsById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamListId } from 'Modules/Routes/selectors/selectCurrentRouteParamListId';
import { sectionsTagsInThisListLoad } from 'Modules/Sections/actions/sectionsTagsInThisListLoad';
import { sectionsUsersInThisListLoad } from 'Modules/Sections/actions/sectionsUsersInThisListLoad';
import { selectTagsInThisList } from 'Modules/Sections/selectors/selectTagsInThisList';
import { selectTagsInThisListLoading } from 'Modules/Sections/selectors/selectTagsInThisListLoading';
import { selectUsersInThisList } from 'Modules/Sections/selectors/selectUsersInThisList';
import { selectUsersInThisListIds } from 'Modules/Sections/selectors/selectUsersInThisListIds';
import { selectUsersInThisListLoading } from 'Modules/Sections/selectors/selectUsersInThisListLoading';
import { List as ListUI } from './List';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const listId = useSelector(selectCurrentRouteParamListId);
  const list = useSelector((state: RootState) => selectListsById(state, { id: listId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const usersInThisListIds = useSelector((state: RootState) => selectUsersInThisListIds(state, { listId }));
  const usersInThisList = useSelector((state: RootState) => selectUsersInThisList(state, { listId }));
  const usersInThisListLoading = useSelector(selectUsersInThisListLoading);
  const tagsInThisList = useSelector(selectTagsInThisList);
  const tagsInThisListLoading = useSelector(selectTagsInThisListLoading);

  useEffect(() => {
    dispatch(loadListById(listId));
    dispatch(bookmarksLoadByListId(listId));
    dispatch(sectionsTagsInThisListLoad(listId));
  }, []);

  useEffect(() => {
    usersInThisListIds?.length && dispatch(sectionsUsersInThisListLoad(usersInThisListIds));
  }, [usersInThisListIds]);

  const onListJoin = () => alert(`Join list ${list?.id}`);

  return (
    <ListUI
      list={list}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      usersInThisList={usersInThisList}
      usersInThisListLoading={usersInThisListLoading}
      tagsInThisList={tagsInThisList}
      tagsInThisListLoading={tagsInThisListLoading}
      onListJoin={onListJoin}
    />
  );
};

export default List;
