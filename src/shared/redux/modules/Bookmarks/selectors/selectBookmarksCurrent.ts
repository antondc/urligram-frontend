import { createSelector } from 'reselect';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksByKey } from './selectBookmarksByKey';
import { selectBookmarksCurrentIds } from './selectBookmarksCurrentIds';

export const selectBookmarksCurrent = createSelector(
  selectBookmarksByKey,
  selectBookmarksCurrentIds,
  (bookmarksByKey: Record<string, BookmarkState>, bookmarksCurrentIds: number[]): BookmarkState[] =>
    bookmarksCurrentIds?.map((currentBookmarkId) => bookmarksByKey[currentBookmarkId])
);
