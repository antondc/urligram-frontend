import { RootState } from 'Modules/rootType';

export const selectUsersMetaSort = (state: RootState): string => state.Users?.meta?.sort;
