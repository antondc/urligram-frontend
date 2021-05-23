import { RootState } from 'Modules/rootType';

export const selectListsMetaSort = (state: RootState): string => state.Lists?.meta?.sort;
