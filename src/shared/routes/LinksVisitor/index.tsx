import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { sectionsMostFollowedTagsLoad } from 'Modules/Sections/actions/sectionsMostFollowedTagsLoad';
import { sectionsNewListsLoad } from 'Modules/Sections/actions/sectionsNewListsLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectNewLists } from 'Modules/Sections/selectors/selectNewLists';
import { selectNewListsLoading } from 'Modules/Sections/selectors/selectNewListsLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { selectMostFollowedTags } from '../../redux/modules/Sections/selectors/selectMostFollowedTags';
import { selectMostFollowedTagsLoading } from '../../redux/modules/Sections/selectors/selectMostFollowedTagsLoading';
import { LinksVisitor } from './LinksVisitor';

const HomeVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const linksAllIds = useSelector(selectLinksAllIds);
  const linksAllIdsLoading = useSelector(selectLinksLoading);
  const mostFollowedLists = useSelector(selectPopularLists);
  const mostFollowedListsLoading = useSelector(selectPopularListsLoading);
  const newLists = useSelector(selectNewLists);
  const newListsLoading = useSelector(selectNewListsLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const mostFollowedTags = useSelector(selectMostFollowedTags);
  const mostFollowedTagsLoading = useSelector(selectMostFollowedTagsLoading);

  useEffect(() => {
    dispatch(loadLinks());
    dispatch(loadPopularLists());
    dispatch(sectionsNewListsLoad());
    dispatch(sectionsNewUsersLoad());
    dispatch(sectionsMostFollowedTagsLoad());
  }, []);

  return (
    <LinksVisitor
      linksIds={linksAllIds}
      loading={linksAllIdsLoading}
      mostFollowedLists={mostFollowedLists}
      mostFollowedListsLoading={mostFollowedListsLoading}
      newLists={newLists}
      newListsLoading={newListsLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
      mostFollowedTags={mostFollowedTags}
      mostFollowedTagsLoading={mostFollowedTagsLoading}
    />
  );
};

export default HomeVisitor;
