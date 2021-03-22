import { RootState } from 'Modules/rootType';

export const selectBookmarkUpdateSuccess = (state: RootState): boolean => state.Bookmarks.bookmarkUpdateSuccess;
