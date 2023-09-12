import { RootState } from 'Modules/rootType';
import { BookmarksState } from '../bookmarks.types';

export const selectBookmarks = (state: RootState): BookmarksState => state.Bookmarks;
