import { createSelector } from 'reselect';

import { BookmarksState, BookmarkState } from '../bookmarks.types';
import { selectBookmarks } from './selectBookmarks';

const selectBookmarkId = (_, { bookmarkId }): number => bookmarkId;

export const selectBookmarksById = createSelector(
  [selectBookmarks, selectBookmarkId],
  (Bookmarks: BookmarksState, bookmarkId): BookmarkState => Bookmarks?.byKey[bookmarkId]
);
