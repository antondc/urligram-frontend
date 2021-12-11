import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { usersLoad } from 'Modules/Users/actions/usersLoad';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { selectUsersMetaSort } from 'Modules/Users/selectors/selectUsersMetaSort';
import { selectUsersTotalItems } from 'Modules/Users/selectors/selectUsersTotalItems';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { isDomAvailable } from 'Tools/utils/dom/isDomAvailable';
import { Users as UsersUI } from './Users';

const Users: React.FC = () => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const usersCurrentIds = useSelector(selectUsersCurrentIds);

  console.log('=======');
  console.log('usersCurrentIds:');
  console.log(JSON.stringify(usersCurrentIds, null, 4));
  console.log('=======');

  const usersLoading = useSelector(selectUsersLoading) && isDomAvailable;
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectUsersTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectUsersMetaSort);
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
    dispatch(usersLoad());
  }, [page, session?.id]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <UsersUI
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
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

export default Users;
