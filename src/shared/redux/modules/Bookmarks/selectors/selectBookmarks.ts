import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../bookmarks.types';

export const selectBookmarks = (state: RootState): BookmarkState[] => Object.values(state.Bookmarks.byKey);
