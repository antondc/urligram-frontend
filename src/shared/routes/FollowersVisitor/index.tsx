import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsUserListsLoad } from 'Modules/Sections/actions/sectionsUserListsLoad';
import { sectionsUserMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsUserMostFollowedTagsLoad';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectUserLists } from 'Modules/Sections/selectors/selectUserLists';
import { selectUserListsLoading } from 'Modules/Sections/selectors/selectUserListsLoading';
import { selectUserMostUsedTags } from 'Modules/Sections/selectors/selectUserMostUsedTags';
import { selectUserMostUsedTagsLoading } from 'Modules/Sections/selectors/selectUserMostUsedTagsLoading';
import { userFollowersLoad } from 'Modules/Users/actions/userFollowersLoad';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { FollowersVisitor as FollowersVisitorUI } from './FollowersVisitor';

const FollowersVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const userId = useSelector(selectCurrentRouteParamUserId);
  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading);
  const userLists = useSelector(selectUserLists);
  const userListsLoading = useSelector(selectUserListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const mostUsedTags = useSelector(selectMostUsedTags);
  const mostUsedTagsLoading = useSelector(selectMostUsedTagsLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(userFollowersLoad(userId));
    dispatch(sectionsUserListsLoad(userId));
    dispatch(sectionsFollowingListsLoad(userId));
    dispatch(sectionsMostUsedTagsLoad());
    dispatch(sectionsUserMostUsedTagsLoad(userId));
  }, []);

  return (
    <FollowersVisitorUI
      user={user}
      userId={userId}
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
      userLists={userLists}
      userListsLoading={userListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      mostUsedTags={mostUsedTags}
      mostUsedTagsLoading={mostUsedTagsLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
    />
  );
};

export default FollowersVisitor;
