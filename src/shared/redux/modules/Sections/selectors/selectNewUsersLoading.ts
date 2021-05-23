import { RootState } from 'Modules/rootType';

export const selectNewUsersLoading = (state: RootState): boolean => !!state.Sections?.NewUsers?.loading;
