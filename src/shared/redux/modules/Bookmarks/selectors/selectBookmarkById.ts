import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../bookmarks.types';

export const selectBookmarksById = (state: RootState, { bookmarkId }: { bookmarkId: number }): BookmarkState =>
  state.Bookmarks?.byKey[bookmarkId];
