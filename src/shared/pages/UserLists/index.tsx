import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsMetaSort } from 'Modules/Lists/selectors/selectListMetaSort';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectListsTotalItems } from 'Modules/Lists/selectors/selectListsTotalItems';
import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import history from 'Services/History';
import { URLWrapper } from '@antoniodcorrea/utils';
import { isDomAvailable } from '@antoniodcorrea/utils-frontend';
import { UserLists as UserListsUi } from './UserLists';

const UserLists: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const { scrollBeforeCallback } = useScrollBeforeCallback();
  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const listsIds = useSelector(selectListsAllIds);
  const listsLoading = useSelector(selectListsLoading) && isDomAvailable;
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectListsTotalItems);
  const currentHref = useSelector(selectCurrentFullUrl);
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

    scrollBeforeCallback(() => history.push(redirectPath));
  };

  const onAddListClick = () => {
    dispatch(switchListModal({ mounted: true }));
  };

  useEffect(() => {
    if (!userId) return;
    dispatch(userLoad(userId));
  }, [session?.id]);

  useEffect(() => {
    if (!userId) return;
    dispatch(listsLoadByUserId({ userId }));
  }, [page, session?.id]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  if (!user || !listsIds) return null;

  return (
    <UserListsUi
      glossary={glossary}
      user={user}
      listsIds={listsIds}
      listsLoading={listsLoading}
      page={page}
      totalItems={totalItems}
      currentHref={currentHref}
      sort={sort}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onChange={onChange}
      onInputChange={onInputChange}
      onAddListClick={onAddListClick}
    />
  );
};

export default UserLists;
