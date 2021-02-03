import { RootState } from 'Modules/rootType';

export const selectSimilarListsLoading = (state: RootState): boolean => !!state.Sections?.SimilarLists?.loading;
