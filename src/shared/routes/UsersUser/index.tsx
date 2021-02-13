import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsMyTagsLoad } from 'Modules/Sections/actions/sectionsMyTagsLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectMyTags } from 'Modules/Sections/selectors/selectMyTags';
import { selectMyTagsLoading } from 'Modules/Sections/selectors/selectMyTagsLoading';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { loadUsers } from 'Modules/Users/actions/loadUsers';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { UsersUser as UsersUserUi } from './UsersUser';

const UsersUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const myTags = useSelector(selectMyTags);
  const myTagsLoading = useSelector(selectMyTagsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(sectionsMyTagsLoad(sessionId));
    dispatch(sectionsFollowingUsersLoad(sessionId));
    dispatch(loadBookmarksByUserId(sessionId));
    dispatch(sectionsMostFollowedUsersLoad());
  }, [sessionId]);

  return (
    <UsersUserUi
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
      sessionId={sessionId}
      myTags={myTags}
      myTagsLoading={myTagsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
    />
  );
};

export default UsersUser;
