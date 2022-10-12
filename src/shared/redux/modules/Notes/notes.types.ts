export const NOTES_LOAD_BY_LINK_ID_REQUEST = 'NOTES_LOAD_BY_LINK_ID_REQUEST';
export const NOTES_LOAD_BY_LINK_ID_SUCCESS = 'NOTES_LOAD_BY_LINK_ID_SUCCESS';
export const NOTES_LOAD_BY_LINK_ID_FAILURE = 'NOTES_LOAD_BY_LINK_ID_FAILURE';

export interface NoteState {
  notes: string;
  userId: string;
  userName: string;
  bookmarkId: number;
}

export interface NotesState {
  currentNotes: NoteState[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
}

export interface NotesLoadApiResponseItem {
  type: 'notes';
  id: number;
  attributes: NoteState;
}

export interface NotesLoadApiResponse {
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  data: NotesLoadApiResponseItem[];
}

interface NotesLoadByLinkIdRequestAction {
  type: typeof NOTES_LOAD_BY_LINK_ID_REQUEST;
  payload: Partial<NotesState>;
}

interface NotesLoadByLinkIdSuccesAction {
  type: typeof NOTES_LOAD_BY_LINK_ID_SUCCESS;
  payload: Partial<NotesState>;
}

interface NotesLoadByLinkIdFailureAction {
  type: typeof NOTES_LOAD_BY_LINK_ID_FAILURE;
  payload: Partial<NotesState>;
}

export type NotesActions =
  | NotesLoadByLinkIdRequestAction
  | NotesLoadByLinkIdSuccesAction
  | NotesLoadByLinkIdFailureAction;
