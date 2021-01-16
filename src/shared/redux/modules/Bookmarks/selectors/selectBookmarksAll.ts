import { RootState } from '../../../rootType';
import { BookmarkState } from '../bookmarks.types';

export const selectBookmarksAll = (state: RootState): BookmarkState[] => Object.values(state.Bookmarks.byKey);
