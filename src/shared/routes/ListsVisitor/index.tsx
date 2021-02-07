import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadLists } from 'Modules/Lists/actions/loadLists';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsNewListsLoad } from 'Modules/Sections/actions/sectionsNewListsLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectNewLists } from 'Modules/Sections/selectors/selectNewLists';
import { selectNewListsLoading } from 'Modules/Sections/selectors/selectNewListsLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { ListsVisitor as ListsVisitorUI } from './ListsVisitor';

const ListsVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const listsIds = useSelector(selectListsAllIds);
  const listsIdsLoading = useSelector(selectListsLoading);
  const popularLists = useSelector(selectPopularLists);
  const popularListsLoading = useSelector(selectPopularListsLoading);
  const newLists = useSelector(selectNewLists);
  const newListsLoading = useSelector(selectNewListsLoading);
  const mostUsedTags = useSelector(selectMostUsedTags);
  const mostUsedTagsLoading = useSelector(selectMostUsedTagsLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);

  useEffect(() => {
    dispatch(loadLists());
    dispatch(loadPopularLists());
    dispatch(sectionsNewListsLoad());
    dispatch(sectionsMostUsedTagsLoad());
    dispatch(sectionsNewUsersLoad());
  }, []);

  return (
    <ListsVisitorUI
      listsIds={listsIds}
      listsIdsLoading={listsIdsLoading}
      popularLists={popularLists}
      popularListsLoading={popularListsLoading}
      newLists={newLists}
      newListsLoading={newListsLoading}
      mostUsedTags={mostUsedTags}
      mostUsedTagsLoading={mostUsedTagsLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
    />
  );
};

export default ListsVisitor;
