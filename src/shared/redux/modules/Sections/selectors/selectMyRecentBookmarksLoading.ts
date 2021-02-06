import { RootState } from 'Modules/rootType';

export const selectMyRecentBookmarksLoading = (state: RootState): boolean =>
  !!state.Sections?.MyRecentBookmarks?.loading;
