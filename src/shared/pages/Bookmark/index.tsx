import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadById } from 'Modules/Bookmarks/actions/bookmarkLoadById';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { notesLoadByLinkId } from 'Modules/Notes/actions/notesLoadByLinkId';
import { selectNotes } from 'Modules/Notes/selectors/selectNotes';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamBookmarkId } from 'Modules/Routes/selectors/selectCurrentRouteParamBookmarkId';
import { usersLoadByLinkId } from 'Modules/Users/actions/usersLoadByLinkId';
import { selectUsersCurrent } from 'Modules/Users/selectors/selectUsersCurrent';
import { Bookmark as BookmarkUi } from './Bookmark';

const Bookmark: React.FC = () => {
  const dispatch = useDispatch();

  const bookmarkId = useSelector(selectCurrentRouteParamBookmarkId);
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId }));
  const notes = useSelector(selectNotes);
  const users = useSelector(selectUsersCurrent);

  console.log('=======');
  console.log('users:');
  console.log(JSON.stringify(users, null, 4));
  console.log('=======');

  useEffect(() => {
    if (!bookmarkId) return;

    dispatch(bookmarkLoadById({ bookmarkId }));
    bookmark?.linkId && dispatch(notesLoadByLinkId(bookmark?.linkId));
  }, [bookmarkId]);

  useEffect(() => {
    if (!bookmark?.linkId) return;

    dispatch(notesLoadByLinkId(bookmark?.linkId));
    dispatch(usersLoadByLinkId(bookmark?.linkId));
  }, [bookmark?.linkId]);

  return <BookmarkUi bookmark={bookmark} notes={notes} users={users} />;
};

export default Bookmark;
