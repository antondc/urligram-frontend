import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsMyListsLoad } from 'Modules/Sections/actions/sectionsMyListsLoad';
import { sectionsUserMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsUserMostFollowedTagsLoad';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectMyLists } from 'Modules/Sections/selectors/selectMyLists';
import { selectMyListsLoading } from 'Modules/Sections/selectors/selectMyListsLoading';
import { selectUserMostUsedTags } from 'Modules/Sections/selectors/selectUserMostUsedTags';
import { selectUserMostUsedTagsLoading } from 'Modules/Sections/selectors/selectUserMostUsedTagsLoading';
import { userFollowingLoad } from 'Modules/Users/actions/userFollowingLoad';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { FollowingUser as FollowingUserUI } from './FollowingUser';

const FollowingUser: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading);
  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);

  useEffect(() => {
    dispatch(userFollowingLoad(userId));
    dispatch(sectionsMyListsLoad(userId));
    dispatch(sectionsFollowingListsLoad(userId));
    dispatch(sectionsUserMostUsedTagsLoad(userId));
    dispatch(sectionsMostFollowedUsersLoad());
  }, []);

  return (
    <FollowingUserUI
      userId={userId}
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
      myLists={myLists}
      myListsLoading={myListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
    />
  );
};

export default FollowingUser;
