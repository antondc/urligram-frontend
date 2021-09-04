import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadByUserId } from 'Modules/Bookmarks/actions/bookmarksLoadByUserId';
import { selectBookmarksByKey } from 'Modules/Bookmarks/selectors/selectBookmarksByKey';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsFollowersUsersLoad } from 'Modules/Sections/actions/sectionsFollowersUsersLoad';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { userLoad } from 'Modules/Users/actions/userLoad';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { UserBookmarks as UserBookmarksUi } from './UserBookmarks';

const UserBookmarks: React.FC = () => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksByKey = useSelector(selectBookmarksByKey);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentFullUrl);
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

    history.push(redirectPath);
  };

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(sectionsFollowersUsersLoad(userId));
    dispatch(sectionsFollowingUsersLoad(userId));
  }, [session?.id]);

  useEffect(() => {
    dispatch(listsLoadByUserId({ userId: session?.id }));
  }, [session?.id]);

  useEffect(() => {
    dispatch(bookmarksLoadByUserId(userId));
    dispatch(tagsSearchLoad());
  }, [url, session?.id]);

  return (
    <UserBookmarksUi
      bookmarksByKey={bookmarksByKey}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      page={page}
      totalItems={totalItems}
      url={url}
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
