import { createSelector } from 'reselect';

import { BookmarksState } from '../bookmarks.types';
import { selectBookmarks } from './selectBookmarks';

export const selectBookmarksCurrentIds = createSelector(
  selectBookmarks,
  (Bookmarks: BookmarksState): number[] => Bookmarks?.currentIds
);
