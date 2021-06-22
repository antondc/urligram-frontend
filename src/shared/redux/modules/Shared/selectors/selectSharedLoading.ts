import { RootState } from 'Modules/rootType';

export const selectSharedLoading = (state: RootState): boolean => !!state.Shared?.loading;
