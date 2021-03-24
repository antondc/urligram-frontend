import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadBySize } from 'Modules/Bookmarks/actions/bookmarksLoadBySize';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { usersLoad } from 'Modules/Users/actions/usersLoad';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { selectUsersMetaSort } from 'Modules/Users/selectors/selectUsersMetaSort';
import { selectUsersTotalItems } from 'Modules/Users/selectors/selectUsersTotalItems';
import { Users as UsersUI } from './Users';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectUsersTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectUsersMetaSort);

  useEffect(() => {
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsNewUsersLoad());
    dispatch(bookmarksLoadBySize(5));
  }, []);

  useEffect(() => {
    dispatch(usersLoad());
  }, [page]);

  return (
    <UsersUI
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
    />
  );
};

export default Users;
