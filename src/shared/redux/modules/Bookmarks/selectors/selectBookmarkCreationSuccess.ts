import { RootState } from '../../rootType';

export const selectBookmarkCreationSuccess = (state: RootState): boolean => state.Bookmarks.bookmarkCreationSuccess;
