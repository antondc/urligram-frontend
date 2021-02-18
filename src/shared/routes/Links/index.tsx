import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { selectLinksTotalItems } from '../../redux/modules/Links/selectors/selectLinksTotalItems';
import { selectCurrentPathAndQuery } from '../../redux/modules/Routes/selectors/selectCurrentPathAndQuery';
import { selectCurrentRouteQueryParamPage } from '../../redux/modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { Links as LinksUi } from './Links';

const Links: React.FC = () => {
  const dispatch = useDispatch();
  const linksAllIds = useSelector(selectLinksAllIds);
  const linksAllIdsLoading = useSelector(selectLinksLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const mostUsedTags = useSelector(selectMostUsedTags);
  const mostUsedTagsLoading = useSelector(selectMostUsedTagsLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectLinksTotalItems);
  const url = useSelector(selectCurrentPathAndQuery);

  useEffect(() => {
    dispatch(sectionsNewUsersLoad());
    dispatch(sectionsMostUsedTagsLoad());
  }, []);

  useEffect(() => {
    dispatch(loadLinks());
  }, [page]);

  return (
    <LinksUi
      linksIds={linksAllIds}
      loading={linksAllIdsLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
      mostUsedTags={mostUsedTags}
      mostUsedTagsLoading={mostUsedTagsLoading}
      url={url}
      totalItems={totalItems}
      page={page}
    />
  );
};

export default Links;
