import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { loadListById } from 'Modules/Lists/actions/listLoadById';
import { selectListsById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamListId } from 'Modules/Routes/selectors/selectCurrentRouteParamListId';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { sectionsSimilarListsLoad } from 'Modules/Sections/actions/sectionsSimilarListsLoad';
import { sectionsTagsInThisListLoad } from 'Modules/Sections/actions/sectionsTagsInThisListLoad';
import { sectionsUsersInThisListLoad } from 'Modules/Sections/actions/sectionsUsersInThisListLoad';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { selectSimilarLists } from 'Modules/Sections/selectors/selectSimilarLists';
import { selectSimilarListsLoading } from 'Modules/Sections/selectors/selectSimilarListsLoading';
import { selectUsersInThisList } from 'Modules/Sections/selectors/selectUsersInThisList';
import { selectUsersInThisListIds } from 'Modules/Sections/selectors/selectUsersInThisListIds';
import { selectUsersInThisListLoading } from 'Modules/Sections/selectors/selectUsersInThisListLoading';
import { selectTagsInThisList } from '../../redux/modules/Sections/selectors/selectTagsInThisList';
import { selectTagsInThisListLoading } from '../../redux/modules/Sections/selectors/selectTagsInThisListLoading';
import { ListVisitor as ListVisitorUI } from './ListVisitor';

const ListVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const mostFollowedLists = useSelector(selectPopularLists);
  const mostFollowedListsLoading = useSelector(selectPopularListsLoading);
  const listId = useSelector(selectCurrentRouteParamListId);
  const list = useSelector((state: RootState) => selectListsById(state, { id: listId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const similarLists = useSelector(selectSimilarLists);
  const similarListsLoading = useSelector(selectSimilarListsLoading);
  const usersInThisListIds = useSelector((state: RootState) => selectUsersInThisListIds(state, { listId }));
  const usersInThisList = useSelector((state: RootState) => selectUsersInThisList(state, { listId }));
  const usersInThisListLoading = useSelector(selectUsersInThisListLoading);
  const tagsInThisList = useSelector(selectTagsInThisList);
  const tagsInThisListLoading = useSelector(selectTagsInThisListLoading);

  useEffect(() => {
    dispatch(loadListById(listId));
    dispatch(bookmarksLoadByListId(listId));
    dispatch(loadPopularLists());
    dispatch(sectionsSimilarListsLoad(listId));
    dispatch(sectionsTagsInThisListLoad(listId));
  }, []);

  useEffect(() => {
    usersInThisListIds?.length && dispatch(sectionsUsersInThisListLoad(usersInThisListIds));
  }, [usersInThisListIds]);

  const onListJoin = () => alert(`Join list ${list?.id}`);

  return (
    <ListVisitorUI
      list={list}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      mostFollowedLists={mostFollowedLists}
      mostFollowedListsLoading={mostFollowedListsLoading}
      similarLists={similarLists}
      similarListsLoading={similarListsLoading}
      usersInThisList={usersInThisList}
      usersInThisListLoading={usersInThisListLoading}
      tagsInThisList={tagsInThisList}
      tagsInThisListLoading={tagsInThisListLoading}
      onListJoin={onListJoin}
    />
  );
};

export default ListVisitor;
