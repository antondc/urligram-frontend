import { RootState } from 'Modules/rootType';
import { BookmarkError } from '../bookmarks.types';

export const selectBookmarksError = (state: RootState): BookmarkError[] => state.Bookmarks.errors;
