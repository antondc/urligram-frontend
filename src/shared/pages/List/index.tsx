import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { listLoadById } from 'Modules/Lists/actions/listLoadById';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamListId } from 'Modules/Routes/selectors/selectCurrentRouteParamListId';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsTagsInThisListLoad } from 'Modules/Sections/actions/sectionsTagsInThisListLoad';
import { sectionsUsersInThisListLoad } from 'Modules/Sections/actions/sectionsUsersInThisListLoad';
import { selectTagsInThisList } from 'Modules/Sections/selectors/selectTagsInThisList';
import { selectTagsInThisListLoading } from 'Modules/Sections/selectors/selectTagsInThisListLoading';
import { selectUsersInThisList } from 'Modules/Sections/selectors/selectUsersInThisList';
import { selectUsersInThisListIds } from 'Modules/Sections/selectors/selectUsersInThisListIds';
import { selectUsersInThisListLoading } from 'Modules/Sections/selectors/selectUsersInThisListLoading';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { List as ListUI } from './List';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const listId = useSelector(selectCurrentRouteParamListId);
  const list = useSelector((state: RootState) => selectListById(state, { id: listId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const usersInThisListIds = useSelector((state: RootState) => selectUsersInThisListIds(state, { listId }));
  const usersInThisList = useSelector((state: RootState) => selectUsersInThisList(state, { listId }));
  const usersInThisListLoading = useSelector(selectUsersInThisListLoading);
  const tagsInThisList = useSelector(selectTagsInThisList);
  const tagsInThisListLoading = useSelector(selectTagsInThisListLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectBookmarksMetaSort);

  useEffect(() => {
    dispatch(listLoadById(listId));
    dispatch(sectionsTagsInThisListLoad(listId));
    dispatch(listsLoadByUserId(session?.id));
  }, []);

  useEffect(() => {
    !!listId && dispatch(bookmarksLoadByListId(listId));
  }, [url]);

  useEffect(() => {
    usersInThisListIds?.length && dispatch(sectionsUsersInThisListLoad(usersInThisListIds));
  }, [JSON.stringify(usersInThisListIds)]);

  return (
    <ListUI
      list={list}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      usersInThisList={usersInThisList}
      usersInThisListLoading={usersInThisListLoading}
      tagsInThisList={tagsInThisList}
      tagsInThisListLoading={tagsInThisListLoading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
    />
  );
};

export default List;
