import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { RootState } from 'Modules/rootType';

export const selectBookmarksByKey = (state: RootState): { [key: string]: BookmarkState } => state.Bookmarks.byKey;
