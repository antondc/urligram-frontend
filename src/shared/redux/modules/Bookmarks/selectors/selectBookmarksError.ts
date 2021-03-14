import { RootState } from '../../rootType';
import { BookmarksError } from '../bookmarks.types';

export const selectBookmarksError = (state: RootState): BookmarksError[] => state.Bookmarks.errors;
