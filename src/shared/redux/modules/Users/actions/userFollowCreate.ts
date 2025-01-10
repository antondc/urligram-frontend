import {
  USER_FOLLOW_CREATE_FAILURE,
  USER_FOLLOW_CREATE_REQUEST,
  USER_FOLLOW_CREATE_SUCCEED,
  UserFollowCreateApiResponse,
  UsersActions,
  UserState,
} from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

type Params = {
  originUserId: string;
  targetUserId: string;
};

export const userFollowCreate =
  ({ originUserId, targetUserId }: Params): AppThunk<Promise<UserState>, UsersActions> =>
  async (dispatch, getState): Promise<UserState> => {
    const { Users: usersBeforeRequest } = getState();

    try {
      dispatch({
        type: USER_FOLLOW_CREATE_REQUEST,
        payload: usersBeforeRequest,
      });

      const { data } = await HttpClient.post<void, UserFollowCreateApiResponse>('/users/me/following/' + targetUserId);

      const { Users: UsersAfterResponse } = getState();
      dispatch({
        type: USER_FOLLOW_CREATE_SUCCEED,
        payload: {
          ...UsersAfterResponse,
          byKey: {
            ...UsersAfterResponse?.byKey,
            [originUserId]: {
              ...UsersAfterResponse?.byKey[originUserId],
              following: [...(UsersAfterResponse?.byKey[originUserId]?.following || []), targetUserId],
            },
          },
        },
      });

      return data.attributes;
    } catch (error) {
      const { Users: UsersOnError } = getState();

      dispatch({
        type: USER_FOLLOW_CREATE_FAILURE,
        payload: {
          ...UsersOnError,
          loading: false,
          errors: [...(UsersOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
