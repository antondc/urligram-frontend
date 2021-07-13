import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsUserMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsUserMostFollowedTagsLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectUserMostUsedTags } from 'Modules/Sections/selectors/selectUserMostUsedTags';
import { selectUserMostUsedTagsLoading } from 'Modules/Sections/selectors/selectUserMostUsedTagsLoading';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { UserLists as UserListsUi } from './UserLists';

const UserLists: React.FC = () => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const listsIds = useSelector(selectListsAllIds);
  const listsLoading = useSelector(selectListsLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);
  const mostFollowedTags = useSelector(selectMostUsedTags);
  const mostFollowedTagsLoading = useSelector(selectMostUsedTagsLoading);
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
    dispatch(userLoad(userId));
    dispatch(sectionsUserMostUsedTagsLoad(userId));
    dispatch(sectionsMostUsedTagsLoad());
  }, [session?.id]);

  useEffect(() => {
    dispatch(listsLoadByUserId(userId));
  }, [page, session?.id]);

  return (
    <UserListsUi
      userId={userId}
      user={user}
      listsIds={listsIds}
      listsLoading={listsLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
      mostFollowedTags={mostFollowedTags}
      mostFollowedTagsLoading={mostFollowedTagsLoading}
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

export default UserLists;
