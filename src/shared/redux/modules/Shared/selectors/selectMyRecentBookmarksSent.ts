import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../../Bookmarks/bookmarks.types';

export const selectMyRecentBookmarksSent = (state: RootState): BookmarkState[] =>
  state.Shared?.bookmarksSent?.map((item) => state.Bookmarks.byKey[item?.bookmarkId]);
