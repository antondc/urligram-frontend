import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadById } from 'Modules/Bookmarks/actions/bookmarkLoadById';
import { selectCurrentRouteParamBookmarkId } from 'Modules/Routes/selectors/selectCurrentRouteParamBookmarkId';
import { Bookmark as BookmarkUi } from './Bookmark';

const Bookmark: React.FC = () => {
  const dispatch = useDispatch();

  const bookmarkId = useSelector(selectCurrentRouteParamBookmarkId);

  useEffect(() => {
    if (!bookmarkId) return;

    dispatch(bookmarkLoadById({ bookmarkId }));
  }, [bookmarkId]);

  return <BookmarkUi />;
};

export default Bookmark;
