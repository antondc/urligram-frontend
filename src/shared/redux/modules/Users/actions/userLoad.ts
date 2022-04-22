import { UserLoadApiResponse, UsersActions, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { usersReceive } from './usersReceive';
import { usersRequest } from './usersRequest';

export const userLoad =
  (userId: string, withLoader?: boolean): AppThunk<Promise<UserState>, UsersActions> =>
  async (dispatch, getState): Promise<UserState> => {
    if (!userId) return;

    const { Users: UsersBeforeApiCall } = getState();

    try {
      dispatch(
        usersRequest({
          ...UsersBeforeApiCall,
          loading: withLoader ? true : UsersBeforeApiCall.loading,
        })
      );

      const { data } = await HttpClient.get<void, UserLoadApiResponse>('/users/' + userId + window.location.search);

      const { Users: UsersAfterApiCall } = getState();
      dispatch(
        usersReceive({
          ...UsersAfterApiCall,
          byKey: {
            ...UsersAfterApiCall.byKey,
            [data?.attributes?.id]: data.attributes,
          },
          loading: withLoader ? false : UsersAfterApiCall.loading,
        })
      );

      return data.attributes;
    } catch (error) {
      throw error;
    }
  };
