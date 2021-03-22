import { RootState } from 'Modules/rootType';
import { BookmarkError } from '../bookmarks.types';

export const selectBookmarksErrorLast = (state: RootState): BookmarkError =>
  state.Bookmarks.errors?.length ? state.Bookmarks.errors[state.Bookmarks.errors?.length - 1] : null;
