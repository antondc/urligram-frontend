import { RootState } from 'Modules/rootType';

export const selectLinksMetaSort = (state: RootState): string => state.Links?.meta?.sort;
