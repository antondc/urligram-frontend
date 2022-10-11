import { RootState } from 'Modules/rootType';

export const selectNotesLoading = (state: RootState): boolean => !!state.Notes?.loading;
