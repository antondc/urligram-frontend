import { RootState } from 'Modules/rootType';

export const selectListCreationSuccess = (state: RootState): boolean => state.Lists.listCreationSuccess;
