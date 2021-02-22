import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { selectLinksTotalItems } from 'Modules/Links/selectors/selectLinksTotalItems';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { selectCurrentRouteQueryParamSort } from '../../redux/modules/Routes/selectors/selectCurrentRouteQueryParamSort';
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
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectCurrentRouteQueryParamSort);

  useEffect(() => {
    dispatch(sectionsNewUsersLoad());
    dispatch(sectionsMostUsedTagsLoad());
  }, []);

  useEffect(() => {
    dispatch(loadLinks());
  }, [url]);

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
      sort={sort}
    />
  );
};

export default Links;
