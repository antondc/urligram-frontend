import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { BookmarksState, BookmarkState } from '../bookmarks.types';

export const selectBookmarks = (state: RootState): BookmarksState => state.Bookmarks;
export const selectLinkId = (_, { linkId }): number => linkId;

export const selectBookmarksWithSimilarLinkId = createSelector(
  selectBookmarks,
  selectLinkId,
  (Bookmarks, linkId): BookmarkState[] => Object.values(Bookmarks?.byKey).filter((item) => item?.linkId === linkId)
);
