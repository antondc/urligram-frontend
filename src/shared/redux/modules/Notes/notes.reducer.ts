import {
  NOTES_LOAD_BY_LINK_ID_FAILURE,
  NOTES_LOAD_BY_LINK_ID_REQUEST,
  NOTES_LOAD_BY_LINK_ID_SUCCESS,
  NotesActions,
  NotesState,
} from './notes.types';

const initialState: NotesState = {
  currentNotes: [],
};

export const Notes = (state = initialState, action: NotesActions): NotesState => {
  switch (action.type) {
    case NOTES_LOAD_BY_LINK_ID_REQUEST:
    case NOTES_LOAD_BY_LINK_ID_SUCCESS:
    case NOTES_LOAD_BY_LINK_ID_FAILURE:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
