import { RootState } from 'Modules/rootType';

export const selectNewListsLoading = (state: RootState): boolean => !!state.Sections?.NewLists?.loading;
