import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectCurrentPathAndQuery } from '../../redux/modules/Routes/selectors/selectCurrentPathAndQuery';
import { Bookmarks as BookmarksUi } from './Bookmarks';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const popularLists = useSelector(selectPopularLists);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const loading = useSelector(selectBookmarksLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentPathAndQuery);

  useEffect(() => {
    dispatch(loadPopularLists());
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
    />
  );
};
export default Home;
