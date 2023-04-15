import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { userFollowingLoad } from 'Modules/Users/actions/userFollowingLoad';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { selectUsersMetaSort } from 'Modules/Users/selectors/selectUsersMetaSort';
import { selectUsersTotalItems } from 'Modules/Users/selectors/selectUsersTotalItems';
import history from 'Services/History';
import { isDomAvailable, URLWrapper } from '@antoniodcorrea/utils';
import { Following as FollowingUI } from './Following';

const Following: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const { scrollBeforeCallback } = useScrollBeforeCallback();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading) && isDomAvailable;
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectUsersTotalItems);
  const currentHref = useSelector(selectCurrentFullUrl);
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

    scrollBeforeCallback(() => history.push(redirectPath));
  };

  useEffect(() => {
    dispatch(userLoad(userId));
  }, []);

  useEffect(() => {
    dispatch(userFollowingLoad({ userId }));
  }, [page]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <FollowingUI
      glossary={glossary}
      user={user}
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
      page={page}
      totalItems={totalItems}
      currentHref={currentHref}
      sort={sort}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onChange={onChange}
      onInputChange={onInputChange}
    />
  );
};

export default Following;
