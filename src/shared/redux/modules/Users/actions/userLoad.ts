import { USER_LOAD_FAILURE, UserLoadApiResponse, UsersActions, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { usersReceive } from './usersReceive';
import { usersRequest } from './usersRequest';

export const userLoad =
  (userId: string, withLoader?: boolean): AppThunk<Promise<UserState>, UsersActions> =>
  async (dispatch, getState): Promise<UserState> => {
    if (!userId) return;

    const { Users: UsersBeforeRequest } = getState();

    try {
      dispatch(
        usersRequest({
          ...UsersBeforeRequest,
          loading: withLoader ? true : UsersBeforeRequest.loading,
        })
      );

      const { data } = await HttpClient.get<void, UserLoadApiResponse>('/users/' + userId + window.location.search);

      const { Users: UsersAfterResponse } = getState();
      dispatch(
        usersReceive({
          ...UsersAfterResponse,
          byKey: {
            ...UsersAfterResponse.byKey,
            [data?.attributes?.id]: data.attributes,
          },
          loading: withLoader ? false : UsersAfterResponse.loading,
        })
      );

      return data.attributes;
    } catch (error) {
      const { Users: UsersOnError } = getState();

      dispatch({
        type: USER_LOAD_FAILURE,
        payload: {
          ...UsersOnError,
          loading: false,
          errors: [...(UsersOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
