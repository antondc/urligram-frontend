import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadLists } from 'Modules/Lists/actions/loadLists';
import { selectListsMetaSort } from 'Modules/Lists/selectors/selectListMetaSort';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectListsTotalItems } from 'Modules/Lists/selectors/selectListsTotalItems';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { Lists as ListsUI } from './Lists';

const Lists: React.FC = () => {
  const dispatch = useDispatch();
  const listsIds = useSelector(selectListsAllIds);
  const listsIdsLoading = useSelector(selectListsLoading);
  const mostUsedTags = useSelector(selectMostUsedTags);
  const mostUsedTagsLoading = useSelector(selectMostUsedTagsLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectListsTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectListsMetaSort);

  useEffect(() => {
    dispatch(sectionsMostUsedTagsLoad());
    dispatch(sectionsNewUsersLoad());
  }, []);

  useEffect(() => {
    dispatch(loadLists());
  }, [page]);

  return (
    <ListsUI
      listsIds={listsIds}
      listsIdsLoading={listsIdsLoading}
      mostUsedTags={mostUsedTags}
      mostUsedTagsLoading={mostUsedTagsLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
    />
  );
};

export default Lists;
