import { RootState } from 'Modules/rootType';

export const selectPopularListsLoading = (state: RootState): boolean => !!state.Sections?.PopularLists?.loading;
