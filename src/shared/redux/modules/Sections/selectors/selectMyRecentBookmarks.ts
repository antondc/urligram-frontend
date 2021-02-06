import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../../Bookmarks/bookmarks.types';

export const selectMyRecentBookmarks = (state: RootState): BookmarkState[] =>
  state.Sections?.MyRecentBookmarks?.currentIds?.map((item) => state.Bookmarks?.byKey[item]) || [];
