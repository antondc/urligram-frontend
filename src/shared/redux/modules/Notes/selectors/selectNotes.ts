import { NoteState } from 'Modules/Notes/notes.types';
import { RootState } from 'Modules/rootType';

export const selectNotes = (state: RootState): NoteState[] => Object.values(state.Notes.currentNotes);
