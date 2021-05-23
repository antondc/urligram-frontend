import { RootState } from 'Modules/rootType';

export const selectUsersLoading = (state: RootState): boolean => state.Users?.loading;
