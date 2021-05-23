import { RootState } from 'Modules/rootType';

export const selectUserListsLoading = (state: RootState): boolean => !!state.Sections?.UserLists?.loading;
