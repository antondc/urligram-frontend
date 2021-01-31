import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { sectionsMyListsLoad } from 'Modules/Sections/actions/sectionsMyListsLoad';
import { sectionsMyTagsLoad } from 'Modules/Sections/actions/sectionsMyTagsLoad';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectFollowingUsers } from 'Modules/Sections/selectors/selectFollowingUsers';
import { selectFollowingUsersLoading } from 'Modules/Sections/selectors/selectFollowingUsersLoading';
import { selectMyLists } from 'Modules/Sections/selectors/selectMyLists';
import { selectMyListsLoading } from 'Modules/Sections/selectors/selectMyListsLoading';
import { selectMyTags } from 'Modules/Sections/selectors/selectMyTags';
import { selectMyTagsLoading } from 'Modules/Sections/selectors/selectMyTagsLoading';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { HomeUser as HomeUserUi } from './HomeUser';

const HomeUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const myTags = useSelector(selectMyTags);
  const myTagsLoading = useSelector(selectMyTagsLoading);
  const followingUsers = useSelector(selectFollowingUsers);
  const followingUsersLoading = useSelector(selectFollowingUsersLoading);

  useEffect(() => {
    dispatch(sectionsMyListsLoad(sessionId));
    dispatch(sectionsFollowingListsLoad(sessionId));
    dispatch(sectionsMyTagsLoad(sessionId));
    dispatch(sectionsFollowingUsersLoad(sessionId));
  }, [sessionId]);

  return (
    <HomeUserUi
      sessionId={sessionId}
      myLists={myLists}
      myListsLoading={myListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      myTags={myTags}
      myTagsLoading={myTagsLoading}
      followingUsers={followingUsers}
      followingUsersLoading={followingUsersLoading}
    />
  );
};

export default HomeUser;
