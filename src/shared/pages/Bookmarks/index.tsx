import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoad } from 'Modules/Bookmarks/actions/bookmarksLoad';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsMyRecentBookmarksLoad } from 'Modules/Sections/actions/sectionsMyRecentBookmarksLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectMyRecentBookmarks } from 'Modules/Sections/selectors/selectMyRecentBookmarks';
import { selectMyRecentBookmarksLoading } from 'Modules/Sections/selectors/selectMyRecentBookmarksLoading';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { sectionsPopularListsLoad } from '../../redux/modules/Sections/actions/sectionsPopularListsLoad';
import { selectPopularListsLoading } from '../../redux/modules/Sections/selectors/selectPopularListsLoading';
import { Bookmarks as BookmarksUi } from './Bookmarks';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const myRecentBookmarks = useSelector(selectMyRecentBookmarks);
  const myRecentBookmarksLoading = useSelector(selectMyRecentBookmarksLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const loading = useSelector(selectBookmarksLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const mostUsedTags = useSelector(selectMostUsedTags);
  const mostUsedTagsLoading = useSelector(selectMostUsedTagsLoading);
  const popularLists = useSelector(selectPopularLists);
  const popularListsLoading = useSelector(selectPopularListsLoading);
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

  useEffect(() => {
    dispatch(sectionsMostUsedTagsLoad());
    dispatch(sectionsPopularListsLoad());
  }, []);

  useEffect(() => {
    dispatch(sectionsMyRecentBookmarksLoad(session?.id));
    dispatch(listsLoadByUserId(session?.id));
  }, [session?.id]);

  useEffect(() => {
    dispatch(bookmarksLoad());
    dispatch(tagsSearchLoad());
  }, [url, session?.id]);

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

  return (
    <BookmarksUi
      session={session}
      bookmarksIds={bookmarksIds}
      loading={loading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onInputChange={onInputChange}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      onChange={onChange}
      mostUsedTags={mostUsedTags}
      mostUsedTagsLoading={mostUsedTagsLoading}
      myRecentBookmarks={myRecentBookmarks}
      myRecentBookmarksLoading={myRecentBookmarksLoading}
      popularLists={popularLists}
      popularListsLoading={popularListsLoading}
    />
  );
};
export default Home;
