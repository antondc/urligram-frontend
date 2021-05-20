import { RootState } from 'Modules/rootType';

export const selectBookmarksVoteLoading = (state: RootState): boolean =>
  !!Object.values(state?.Bookmarks?.byKey).find((item) => !!item?.statistics?.loading);
