import { RootState } from 'Modules/rootType';

export const selectMyListsLoading = (state: RootState): boolean => !!state.Sections?.MyLists?.loading;
