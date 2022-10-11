import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadById } from 'Modules/Bookmarks/actions/bookmarkLoadById';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamBookmarkId } from 'Modules/Routes/selectors/selectCurrentRouteParamBookmarkId';
import { Bookmark as BookmarkUi } from './Bookmark';

const Bookmark: React.FC = () => {
  const dispatch = useDispatch();

  const bookmarkId = useSelector(selectCurrentRouteParamBookmarkId);
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId }));

  useEffect(() => {
    if (!bookmarkId) return;

    dispatch(bookmarkLoadById({ bookmarkId }));
  }, [bookmarkId]);

  return <BookmarkUi bookmark={bookmark} />;
};

export default Bookmark;
