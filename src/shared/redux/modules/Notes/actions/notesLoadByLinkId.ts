import {
  NOTES_LOAD_BY_LINK_ID_FAILURE,
  NOTES_LOAD_BY_LINK_ID_REQUEST,
  NOTES_LOAD_BY_LINK_ID_SUCCESS,
  NotesActions,
  NotesLoadApiResponse,
  NoteState,
} from 'Modules/Notes/notes.types';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';

interface Params {
  linkId: number;
  sortParam?: string;
}

export const notesLoadByLinkId =
  ({ linkId, sortParam }: Params): AppThunk<Promise<NoteState[]>, NotesActions> =>
  async (dispatch, getState): Promise<NoteState[]> => {
    if (!linkId) return;

    const { Notes: notesBeforeRequest } = getState();

    dispatch({
      type: NOTES_LOAD_BY_LINK_ID_REQUEST,
      payload: {
        ...notesBeforeRequest,
        loading: true,
      },
    });

    const queryString = QueryStringWrapper.stringifyQueryParams({ sort: sortParam });

    try {
      const { meta, data } = await HttpClient.get<void, NotesLoadApiResponse>(`/links/${linkId}/notes?${queryString}`);

      const notesArray = data?.map((item) => item.attributes);

      dispatch({
        type: NOTES_LOAD_BY_LINK_ID_SUCCESS,
        payload: {
          currentNotes: notesArray,
          meta: {
            sort: meta?.sort,
            totalItems: meta?.totalItems,
          },
          loading: false,
        },
      });

      return notesArray;
    } catch (error) {
      const { Notes: notesOnError } = getState();

      dispatch({
        type: NOTES_LOAD_BY_LINK_ID_FAILURE,
        payload: {
          ...notesOnError,
          loading: false,
        },
      });
    }

    return;
  };
