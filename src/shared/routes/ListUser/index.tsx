import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { loadListById } from 'Modules/Lists/actions/listLoadById';
import { selectListsById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamListId } from 'Modules/Routes/selectors/selectCurrentRouteParamListId';
import { sectionsMyRecentBookmarksLoad } from 'Modules/Sections/actions/sectionsMyRecentBookmarksLoad';
import { sectionsSimilarListsLoad } from 'Modules/Sections/actions/sectionsSimilarListsLoad';
import { sectionsTagsInThisListLoad } from 'Modules/Sections/actions/sectionsTagsInThisListLoad';
import { sectionsUsersInThisListLoad } from 'Modules/Sections/actions/sectionsUsersInThisListLoad';
import { selectMyRecentBookmarks } from 'Modules/Sections/selectors/selectMyRecentBookmarks';
import { selectMyRecentBookmarksLoading } from 'Modules/Sections/selectors/selectMyRecentBookmarksLoading';
import { selectSimilarLists } from 'Modules/Sections/selectors/selectSimilarLists';
import { selectSimilarListsLoading } from 'Modules/Sections/selectors/selectSimilarListsLoading';
import { selectTagsInThisList } from 'Modules/Sections/selectors/selectTagsInThisList';
import { selectTagsInThisListLoading } from 'Modules/Sections/selectors/selectTagsInThisListLoading';
import { selectUsersInThisList } from 'Modules/Sections/selectors/selectUsersInThisList';
import { selectUsersInThisListIds } from 'Modules/Sections/selectors/selectUsersInThisListIds';
import { selectUsersInThisListLoading } from 'Modules/Sections/selectors/selectUsersInThisListLoading';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { ListUser as ListUserUI } from './ListUser';

const ListUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);

  const listId = useSelector(selectCurrentRouteParamListId);
  const list = useSelector((state: RootState) => selectListsById(state, { id: listId }));
  const myRecentBookmarks = useSelector(selectMyRecentBookmarks);
  const myRecentBookmarksLoading = useSelector(selectMyRecentBookmarksLoading);
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
    dispatch(sectionsMyRecentBookmarksLoad(sessionId));
    dispatch(bookmarksLoadByListId(listId));
    dispatch(sectionsSimilarListsLoad(listId));
    dispatch(sectionsTagsInThisListLoad(listId));
  }, []);

  useEffect(() => {
    usersInThisListIds?.length && dispatch(sectionsUsersInThisListLoad(usersInThisListIds));
  }, [usersInThisListIds]);

  const onListJoin = () => alert(`Join list ${list?.id}`);

  return (
    <ListUserUI
      sessionId={sessionId}
      list={list}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      myRecentBookmarks={myRecentBookmarks}
      myRecentBookmarksLoading={myRecentBookmarksLoading}
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

export default ListUser;
