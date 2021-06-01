import { UserLoadApiResponse, UsersActions, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { usersReceive } from './usersReceive';
import { usersRequest } from './usersRequest';

export const userLoad = (userId: string): AppThunk<Promise<UserState>, UsersActions> => async (
  dispatch,
  getState
): Promise<UserState> => {
  if (!userId) return;

  const { Users } = getState();

  try {
    dispatch(
      usersRequest({
        ...Users,
        loading: true,
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
        loading: false,
      })
    );

    return data.attributes;
  } catch (error) {
    throw error;
  }
};
