import { RootState } from 'Modules/rootType';

export const selectListsAllIds = (state: RootState): number[] => state.Lists?.currentIds;
