import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
import { bookmarksLoadByUserId } from 'Modules/Bookmarks/actions/bookmarksLoadByUserId';
import { selectBookmarksByKey } from 'Modules/Bookmarks/selectors/selectBookmarksByKey';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import history from 'Services/History';
import { isDomAvailable, URLWrapper } from '@antoniodcorrea/utils';
import { UserBookmarks as UserBookmarksUi } from './UserBookmarks';

const UserBookmarks: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const { scrollBeforeCallback } = useScrollBeforeCallback();
  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksByKey = useSelector(selectBookmarksByKey);
  const bookmarksLoading = useSelector(selectBookmarksLoading) && isDomAvailable;
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const currentHref = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectBookmarksMetaSort);
  const tagsSearch = useSelector(selectTagsSearch);
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];
  const allTags = useSelector(selectTagsAll);
  const currentQueryParamFilter = useSelector(selectCurrentRouteQueryParamFilter);
  const currentQueryParamFilterTags =
    currentQueryParamFilter?.tags?.map((item) => ({
      label: item.toString(),
      value: item,
    })) || [];

  const onAddBookmarkClick = () => {
    dispatch(switchBookmarkCreateModal(true));
  };

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
  }, [session?.id]);

  useEffect(() => {
    dispatch(bookmarksLoadByUserId(userId));
  }, [currentHref, session?.id]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <UserBookmarksUi
      glossary={glossary}
      user={user}
      bookmarksByKey={bookmarksByKey}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      page={page}
      totalItems={totalItems}
      currentHref={currentHref}
      sort={sort}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onInputChange={onInputChange}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      onChange={onChange}
      onAddBookmarkClick={onAddBookmarkClick}
    />
  );
};

export default UserBookmarks;
