import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsMyListsLoad } from 'Modules/Sections/actions/sectionsMyListsLoad';
import { sectionsMyTagsLoad } from 'Modules/Sections/actions/sectionsMyTagsLoad';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectMyLists } from 'Modules/Sections/selectors/selectMyLists';
import { selectMyListsLoading } from 'Modules/Sections/selectors/selectMyListsLoading';
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
  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const myTags = useSelector(selectMyTags);
  const myTagsLoading = useSelector(selectMyTagsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(sectionsMyListsLoad(sessionId));
    dispatch(sectionsFollowingListsLoad(sessionId));
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
      myLists={myLists}
      myListsLoading={myListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      myTags={myTags}
      myTagsLoading={myTagsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
    />
  );
};

export default UsersUser;
