import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listsLoad } from 'Modules/Lists/actions/listsLoad';
import { selectListsMetaSort } from 'Modules/Lists/selectors/selectListMetaSort';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectListsTotalItems } from 'Modules/Lists/selectors/selectListsTotalItems';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { isDomAvailable } from 'Tools/utils/dom/isDomAvailable';
import { Lists as ListsUI } from './Lists';

const Lists: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const listsIds = useSelector(selectListsAllIds);
  const listsIdsLoading = useSelector(selectListsLoading) && isDomAvailable;
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectListsTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectListsMetaSort);
  const allTags = useSelector(selectTagsAll);
  const currentQueryParamFilter = useSelector(selectCurrentRouteQueryParamFilter);
  const tagsSearch = useSelector(selectTagsSearch);
  const currentQueryParamFilterTags =
    currentQueryParamFilter?.tags?.map((item) => ({
      label: item.toString(),
      value: item,
    })) || [];
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];

  const onInputChange = (string: string) => {
    !!string && dispatch(tagsSearchLoad(string));
  };

  const onChange = (values) => {
    const tags: string[] = values?.map((item) => item.value);
    const myUrl = new URLWrapper(window.document.location.href);

    myUrl.upsertSearchParams({ filter: { tags } });
    myUrl.deleteSearchParam('page[offset]'); // Restart page on new search
    const redirectPath = myUrl.getPathAndSearch();

    history.push(redirectPath);
  };

  useEffect(() => {
    dispatch(listsLoad());
  }, [page, session?.id]);

  return (
    <ListsUI
      listsIds={listsIds}
      listsIdsLoading={listsIdsLoading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onChange={onChange}
      onInputChange={onInputChange}
    />
  );
};

export default Lists;
