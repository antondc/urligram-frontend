import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sectionsMyListsLoad } from '../../redux/modules/Sections/actions/sectionsMyListsLoad';
import { selectMyLists } from '../../redux/modules/Sections/selectors/selectMyLists';
import { selectMyListsLoading } from '../../redux/modules/Sections/selectors/selectMyListsLoading';
import { selectSessionUserId } from '../../redux/modules/Session/selectors/selectSessionUserId';
import { HomeUser as HomeUserUi } from './HomeUser';

const HomeUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);

  useEffect(() => {
    dispatch(sectionsMyListsLoad(sessionId));
  }, [sessionId]);

  return <HomeUserUi myLists={myLists} myListsLoading={myListsLoading} />;
};

export default HomeUser;
