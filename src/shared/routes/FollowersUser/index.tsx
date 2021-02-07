import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
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
import { userFollowersLoad } from 'Modules/Users/actions/userFollowersLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { userLoad } from '../../redux/modules/Users/actions/userLoad';
import { FollowersUser as FollowersUserUI } from './FollowersUser';

const FollowersUser: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
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
    dispatch(userLoad(userId));
    dispatch(userFollowersLoad(userId));
    dispatch(sectionsMyListsLoad(userId));
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsFollowingListsLoad(userId));
    dispatch(sectionsMostUsedTagsLoad());
    dispatch(sectionsUserMostUsedTagsLoad(userId));
  }, []);

  return (
    <FollowersUserUI
      user={user}
      userId={userId}
      usersCurrentIds={usersCurrentIds}
      myLists={myLists}
      myListsLoading={myListsLoading}
      usersLoading={usersLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
    />
  );
};

export default FollowersUser;
