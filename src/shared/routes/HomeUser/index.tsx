import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sectionsFollowingListsLoad } from '../../redux/modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsMyListsLoad } from '../../redux/modules/Sections/actions/sectionsMyListsLoad';
import { selectFollowingLists } from '../../redux/modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from '../../redux/modules/Sections/selectors/selectFollowingListsLoading';
import { selectMyLists } from '../../redux/modules/Sections/selectors/selectMyLists';
import { selectMyListsLoading } from '../../redux/modules/Sections/selectors/selectMyListsLoading';
import { selectSessionUserId } from '../../redux/modules/Session/selectors/selectSessionUserId';
import { HomeUser as HomeUserUi } from './HomeUser';

const HomeUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  useEffect(() => {
    dispatch(sectionsMyListsLoad(sessionId));
    dispatch(sectionsFollowingListsLoad(sessionId));
  }, [sessionId]);

  return (
    <HomeUserUi
      myLists={myLists}
      myListsLoading={myListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
    />
  );
};

export default HomeUser;
