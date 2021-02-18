import { RootState } from 'Modules/rootType';

export const selectLinksTotalItems = (state: RootState): number => state.Links?.meta?.totalItems;
