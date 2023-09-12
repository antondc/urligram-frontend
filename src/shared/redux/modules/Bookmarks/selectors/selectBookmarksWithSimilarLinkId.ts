import { createSelector } from 'reselect';

import { BookmarksState, BookmarkState } from '../bookmarks.types';
import { selectBookmarks } from './selectBookmarks';

export const selectLinkId = (_, { linkId }): number => linkId;

export const selectBookmarksWithSimilarLinkId = createSelector(
  selectBookmarks,
  selectLinkId,
  (Bookmarks: BookmarksState, linkId): BookmarkState[] =>
    Object.values(Bookmarks?.byKey).filter((item) => item?.linkId === linkId)
);
