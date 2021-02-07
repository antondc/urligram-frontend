import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsMostFollowedTagsLoad } from 'Modules/Sections/actions/sectionsMostFollowedTagsLoad';
import { sectionsUserListsLoad } from 'Modules/Sections/actions/sectionsUserListsLoad';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectMostFollowedTags } from 'Modules/Sections/selectors/selectMostFollowedTags';
import { selectMostFollowedTagsLoading } from 'Modules/Sections/selectors/selectMostFollowedTagsLoading';
import { selectUserLists } from 'Modules/Sections/selectors/selectUserLists';
import { selectUserListsLoading } from 'Modules/Sections/selectors/selectUserListsLoading';
import { loadUsers } from 'Modules/Users/actions/loadUsers';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { FollowersVisitor as FollowersVisitorUI } from './FollowersVisitor';

const FollowersVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);

  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading);
  const userLists = useSelector(selectUserLists);
  const userListsLoading = useSelector(selectUserListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const mostFollowedTags = useSelector(selectMostFollowedTags);
  const mostFollowedTagsLoading = useSelector(selectMostFollowedTagsLoading);

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(sectionsUserListsLoad(userId));
    dispatch(sectionsFollowingListsLoad(userId));
    dispatch(sectionsMostFollowedTagsLoad());
  }, []);

  return (
    <FollowersVisitorUI
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
      userLists={userLists}
      userListsLoading={userListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      mostFollowedTags={mostFollowedTags}
      mostFollowedTagsLoading={mostFollowedTagsLoading}
    />
  );
};

export default FollowersVisitor;
