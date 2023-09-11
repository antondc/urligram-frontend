import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../bookmarks.types';

const selectBookmarksState = (state: RootState) => state.Bookmarks;
const selectBookmarkId = (_, { bookmarkId }): number => bookmarkId;

export const selectBookmarksById = createSelector(
  [selectBookmarksState, selectBookmarkId],
  (Bookmarks, bookmarkId): BookmarkState => Bookmarks?.byKey[bookmarkId]
);
