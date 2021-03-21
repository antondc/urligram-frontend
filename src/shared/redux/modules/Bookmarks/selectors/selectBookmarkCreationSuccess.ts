import { RootState } from 'Modules/rootType';

export const selectBookmarkCreationSuccess = (state: RootState): boolean => state.Bookmarks.bookmarkCreationSuccess;
