import { RootState } from 'Modules/rootType';
import { NotesState } from '../notes.types';

export const selectNotes = (state: RootState): NotesState => state.Notes;
