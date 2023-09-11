import { createSelector } from 'reselect';

import { BookmarksState, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { RootState } from 'Modules/rootType';

export const selectBookmarksByKey = createSelector(
  (state: RootState): BookmarksState => state.Bookmarks,
  (Bookmarks): { [key: string]: BookmarkState } => Bookmarks.byKey
);
