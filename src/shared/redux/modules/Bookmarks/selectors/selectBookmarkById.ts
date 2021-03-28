import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../bookmarks.types';

export const selectBookmarksById = (state: RootState, { id }: { id: number }): BookmarkState | Record<string, never> =>
  state.Bookmarks?.byKey[id] || {};
