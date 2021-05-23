import { RootState } from 'Modules/rootType';

export const selectListsTotalItems = (state: RootState): number => state.Lists?.meta?.totalItems;
