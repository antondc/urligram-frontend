import { RootState } from 'Modules/rootType';

export const selectBookmarksTotalItems = (state: RootState): number => state.Bookmarks?.meta?.totalItems;
