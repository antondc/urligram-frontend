import { ListCreateApiRequest, ListCreateApiResponse, ListsActions, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { usersReceive } from '../../Users/actions/usersReceive';
import { UsersActions } from '../../Users/users.types';
import { listCreateFailure } from './listCreateFailure';
import { listCreateRequest } from './listCreateRequest';
import { listCreateSuccess } from './listCreateSuccess';

export const listCreate =
  ({
    listName,
    listDescription,
    listIsPublic,
  }: ListCreateApiRequest): AppThunk<Promise<ListState>, ListsActions | UsersActions> =>
  async (dispatch, getState): Promise<ListState> => {
    const { Lists: listsBeforeRequest } = getState();
    try {
      dispatch(listCreateRequest({ ...listsBeforeRequest }));

      const { data } = await HttpClient.post<void, ListCreateApiResponse>('/lists', {
        listName,
        listDescription,
        listIsPublic,
      });
      const { Lists: listsAfterResponse, Users: usersAfterResponse, Session: sessionAfterResponse } = getState();

      await dispatch(
        listCreateSuccess({
          ...listsAfterResponse,
          byKey: {
            ...listsAfterResponse.byKey,
            [data.attributes.id]: data.attributes,
          },
          currentIds: [data.attributes?.id, ...(listsAfterResponse?.currentIds || [])],
        })
      );

      // Add list to user
      dispatch(
        usersReceive({
          ...usersAfterResponse,
          byKey: {
            ...usersAfterResponse.byKey,
            [sessionAfterResponse?.id]: {
              ...usersAfterResponse.byKey[sessionAfterResponse?.id],
              lists: [
                ...(usersAfterResponse.byKey[sessionAfterResponse?.id]?.lists || []),
                {
                  id: data.attributes.id,
                  userRole: 'admin',
                },
              ],
            },
          },
        })
      );

      return data?.attributes;
    } catch (error) {
      const { Lists: listsOnError } = getState();

      await dispatch(
        listCreateFailure({
          ...listsOnError,
          errors: [...(listsOnError?.errors || []), error],
        })
      );

      throw error;
    }
  };
