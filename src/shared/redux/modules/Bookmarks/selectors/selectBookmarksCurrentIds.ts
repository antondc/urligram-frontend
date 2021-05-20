import { RootState } from 'Modules/rootType';

export const selectBookmarksCurrentIds = (state: RootState): number[] => state.Bookmarks?.currentIds;
