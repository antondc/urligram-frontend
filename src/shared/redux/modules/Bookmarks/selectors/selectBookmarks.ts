import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { BookmarksState } from '../bookmarks.types';

export const selectBookmarks = createSelector(
  (state: RootState) => state,
  (state): BookmarksState => state.Bookmarks
);
