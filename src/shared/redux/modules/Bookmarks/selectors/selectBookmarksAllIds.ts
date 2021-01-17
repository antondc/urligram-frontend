import { RootState } from 'Modules/rootType';

export const selectBookmarksAllIds = (state: RootState): number[] => state.Bookmarks?.currentIds;
