import { createSelector } from 'reselect';

import { BookmarksState, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarks } from './selectBookmarks';

export const selectBookmarksByKey = createSelector(
  selectBookmarks,
  (Bookmarks: BookmarksState): { [key: string]: BookmarkState } => Bookmarks.byKey
);
