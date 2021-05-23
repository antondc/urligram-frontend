import { RootState } from 'Modules/rootType';

export const selectListsLoading = (state: RootState): boolean => state.Lists?.loading;
