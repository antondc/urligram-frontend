import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
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
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { userFollowersLoad } from 'Modules/Users/actions/userFollowersLoad';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { UserListsUser as UserListsUserUi } from './UserListsUser';

const UserListsUser: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const sessionId = useSelector(selectSessionUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const listsIds = useSelector(selectListsAllIds);
  const listsLoading = useSelector(selectListsLoading);

  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(listsLoadByUserId(userId));

    dispatch(sectionsMyListsLoad(userId));
    dispatch(sectionsFollowingListsLoad(userId));
    dispatch(sectionsUserMostUsedTagsLoad(userId));
    dispatch(userFollowersLoad(userId));
  }, []);

  return (
    <UserListsUserUi
      userId={userId}
      sessionId={sessionId}
      user={user}
      listsIds={listsIds}
      listsLoading={listsLoading}
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

export default UserListsUser;
