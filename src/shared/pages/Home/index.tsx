import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoad } from 'Modules/Bookmarks/actions/bookmarksLoad';
import { bookmarksRecommended } from 'Modules/Bookmarks/actions/bookmarksRecommended';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { Home as HomeUI } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const bookmarksCurrentIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksCurrentIdsLoading = useSelector(selectBookmarksLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentFullUrl);

  useEffect(() => {
    if (!!session?.id) {
      dispatch(bookmarksRecommended());

      return;
    }
    dispatch(bookmarksLoad());
  }, [url, session?.id]);

  return (
    <HomeUI
      bookmarksIds={bookmarksCurrentIds}
      bookmarksIdsLoading={bookmarksCurrentIdsLoading}
      page={page}
      totalItems={totalItems}
      url={url}
    />
  );
};

export default Home;
