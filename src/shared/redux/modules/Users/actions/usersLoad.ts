import { USERS_LOAD_FAILURE, UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';
import { usersReceive } from './usersReceive';
import { usersRequest } from './usersRequest';

export const usersLoad =
  (): AppThunk<Promise<UserState[]>, UsersActions> =>
  async (dispatch, getState): Promise<UserState[]> => {
    const APIBaseEndpoint = '/users';
    const { Users: usersBeforeRequest } = getState();

    try {
      dispatch(
        usersRequest({
          ...usersBeforeRequest,
          loading: true,
          meta: {
            ...usersBeforeRequest.meta,
            sort: undefined,
          },
        })
      );

      const { meta, data } = await HttpClient.get<void, UsersLoadApiResponse>(APIBaseEndpoint + window.location.search);

      const usersArray = data?.map((item) => item.attributes);

      const { Users: UsersAfterResponse } = getState();
      dispatch(
        usersReceive({
          ...UsersAfterResponse,
          byKey: {
            ...UsersAfterResponse.byKey,
            ...serializerFromArrayToByKey<UserState, UserState>({
              data: usersArray,
            }),
          },
          currentIds: data?.map((item) => item.id),
          meta,
          loading: false,
        })
      );

      return usersArray;
    } catch (error) {
      const { Users: UsersOnError } = getState();

      dispatch({
        type: USERS_LOAD_FAILURE,
        payload: {
          ...UsersOnError,
          loading: false,
          errors: [...(UsersOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
