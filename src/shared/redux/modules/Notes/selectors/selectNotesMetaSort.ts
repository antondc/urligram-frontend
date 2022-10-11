import { RootState } from 'Modules/rootType';

export const selectNotesMetaSort = (state: RootState): string => state.Notes?.meta?.sort;
