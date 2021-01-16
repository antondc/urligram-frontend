import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { RootState } from 'Modules/rootType';

export const selectBookmarksAll = (state: RootState): BookmarkState[] => Object.values(state.Bookmarks.byKey);
