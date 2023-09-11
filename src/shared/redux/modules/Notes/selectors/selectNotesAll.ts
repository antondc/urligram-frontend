import { createSelector } from 'reselect';

import { NotesState, NoteState } from 'Modules/Notes/notes.types';
import { selectNotes } from './selectNotes';

export const selectNotesAll = createSelector(selectNotes, (Notes: NotesState): NoteState[] =>
  Object.values(Notes.currentNotes)
);
