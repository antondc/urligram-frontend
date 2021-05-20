import { RootState } from 'Modules/rootType';

export const selectBookmarksMetaSort = (state: RootState): string => state.Bookmarks?.meta?.sort;
