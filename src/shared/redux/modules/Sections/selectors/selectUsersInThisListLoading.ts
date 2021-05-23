import { RootState } from 'Modules/rootType';

export const selectUsersInThisListLoading = (state: RootState): boolean => !!state.Sections?.UsersInThisList?.loading;
