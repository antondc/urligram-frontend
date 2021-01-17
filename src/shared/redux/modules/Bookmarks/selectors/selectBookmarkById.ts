import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../bookmarks.types';

export const selectBookmarksById = (state: RootState, { id }: { id: number }): BookmarkState =>
  state.Bookmarks?.byKey[id];
