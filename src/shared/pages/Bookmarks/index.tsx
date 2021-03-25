import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsPopularListsLoad } from 'Modules/Sections/actions/sectionsPopularListsLoad';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { Bookmarks as BookmarksUi } from './Bookmarks';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const popularLists = useSelector(selectPopularLists);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const loading = useSelector(selectBookmarksLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectBookmarksMetaSort);

  useEffect(() => {
    dispatch(sectionsPopularListsLoad());
  }, []);

  useEffect(() => {
    dispatch(loadBookmarks());
  }, [page]);

  return (
    <BookmarksUi
      bookmarksIds={bookmarksIds}
      popularLists={popularLists}
      loading={loading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
    />
  );
};
export default Home;
