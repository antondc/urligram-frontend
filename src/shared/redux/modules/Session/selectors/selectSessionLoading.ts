import { RootState } from 'Modules/rootType';

export const selectSessionLoading = (state: RootState): boolean => state.Session.loading;
