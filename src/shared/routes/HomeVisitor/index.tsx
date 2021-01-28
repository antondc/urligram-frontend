import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsNewListsLoad } from 'Modules/Sections/actions/sectionsNewListsLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectNewLists } from 'Modules/Sections/selectors/selectNewLists';
import { selectNewListsLoading } from 'Modules/Sections/selectors/selectNewListsLoading';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { HomeVisitor as HomeVisitorUI } from './HomeVisitor';

const HomeVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const mostFollowedLists = useSelector(selectPopularLists);
  const newLists = useSelector(selectNewLists);
  const newListsLoading = useSelector(selectNewListsLoading);
  const mostFollowedListsLoading = useSelector(selectPopularListsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);

  useEffect(() => {
    dispatch(loadPopularLists());
    dispatch(sectionsNewListsLoad());
    dispatch(sectionsMostFollowedUsersLoad());
  }, []);

  return (
    <HomeVisitorUI
      mostFollowedLists={mostFollowedLists}
      mostFollowedListsLoading={mostFollowedListsLoading}
      newLists={newLists}
      newListsLoading={newListsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
    />
  );
};

export default HomeVisitor;
