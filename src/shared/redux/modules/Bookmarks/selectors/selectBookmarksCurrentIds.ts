import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { BookmarksState } from '../bookmarks.types';

export const selectBookmarksCurrentIds = createSelector(
  (state: RootState): BookmarksState => state.Bookmarks,
  (Bookmarks: BookmarksState): number[] => Bookmarks?.currentIds
);
