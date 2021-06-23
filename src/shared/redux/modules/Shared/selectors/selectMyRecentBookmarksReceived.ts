import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../../Bookmarks/bookmarks.types';

export const selectMyRecentBookmarksReceived = (state: RootState): BookmarkState[] =>
  state.Shared?.bookmarksReceived?.map((item) => state.Bookmarks.byKey[item]);
