import { RootState } from 'Modules/rootType';

export const selectBookmarksLoading = (state: RootState): boolean => !!state.Bookmarks.loading;
