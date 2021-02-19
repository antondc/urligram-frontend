import { RootState } from 'Modules/rootType';

export const selectUsersTotalItems = (state: RootState): number => state.Users?.meta?.totalItems;
