import { RootState } from 'Modules/rootType';
import { BookmarksError } from '../bookmarks.types';

export const selectBookmarksErrorLast = (state: RootState): BookmarksError =>
  state.Bookmarks.errors?.length ? state.Bookmarks.errors[state.Bookmarks.errors?.length - 1] : null;
