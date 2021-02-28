import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { selectLinksMetaSort } from 'Modules/Links/selectors/selectLinksMetaSort';
import { selectLinksTotalItems } from 'Modules/Links/selectors/selectLinksTotalItems';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import history from 'Services/History';
import { QueryStringWrapper } from 'Services/QueryStringWrapper';
import { URLWrapper } from 'Services/URLWrapper';
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
  const sort = useSelector(selectLinksMetaSort);
  const tagsSearch = useSelector(selectTagsSearch);
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];
  const allTags = useSelector(selectTagsAll);
  const currentQueryParamFilter = useSelector(selectCurrentRouteQueryParamFilter);
  const currentQueryParamFilterTags =
    currentQueryParamFilter?.tags?.map((item) => ({
      label: item.toString(),
      value: item,
    })) || [];

  useEffect(() => {
    dispatch(sectionsNewUsersLoad());
    dispatch(sectionsMostUsedTagsLoad());
  }, []);

  useEffect(() => {
    dispatch(loadLinks());

    dispatch(tagsSearchLoad());
  }, [url]);

  const onInputChange = (string: string) => {
    console.log('onInputChange: ', string);
    !!string && dispatch(tagsSearchLoad(string));
  };

  const onChange = (values) => {
    const tags = values?.map((item) => item.value);
    const myUrl = new URLWrapper(window.document.location.href);
    myUrl.deleteSearchParam('filter[tags][]');
    const string = QueryStringWrapper.stringifyQueryParams({
      filter: {
        tags,
      },
    });
    // TODO: Fix malformed url
    console.clear();
    console.log('string: ', string);
    const redirectPath = myUrl.getPathAndSearch() + string;

    history.push(redirectPath);
  };

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
      tagsSearchFormatted={tagsSearchFormatted}
      tagsSearch={tagsSearch}
      allTags={allTags}
      onInputChange={onInputChange}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      onChange={onChange}
    />
  );
};

export default Links;
