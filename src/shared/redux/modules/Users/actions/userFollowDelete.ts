import {
  USER_FOLLOW_DELETE_FAILURE,
  USER_FOLLOW_DELETE_REQUEST,
  USER_FOLLOW_DELETE_SUCCEED,
  UserFollowDeleteApiResponse,
  UsersActions,
} from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

type Params = {
  originUserId: string;
  targetUserId: string;
};

type Response = {
  success: boolean;
};

export const userFollowDelete = ({
  originUserId,
  targetUserId,
}: Params): AppThunk<Promise<Response>, UsersActions> => async (dispatch, getState): Promise<Response> => {
  const { Users: usersBeforeRequest } = getState();

  try {
    dispatch({
      type: USER_FOLLOW_DELETE_REQUEST,
      payload: usersBeforeRequest,
    });

    const { data } = await HttpClient.delete<void, UserFollowDeleteApiResponse>('/users/me/following/' + targetUserId);

    const { Users: UsersAfterResponse } = getState();
    dispatch({
      type: USER_FOLLOW_DELETE_SUCCEED,
      payload: {
        ...UsersAfterResponse,
        byKey: {
          ...UsersAfterResponse?.byKey,
          [targetUserId]: {
            ...UsersAfterResponse?.byKey[targetUserId],
            followers: UsersAfterResponse?.byKey[targetUserId]?.followers?.filter((item) => item !== originUserId),
          },
          [originUserId]: {
            ...UsersAfterResponse?.byKey[originUserId],
            following: UsersAfterResponse?.byKey[originUserId]?.following?.filter((item) => item !== targetUserId),
          },
        },
      },
    });

    return data;
  } catch (error) {
    const { Users: UsersOnError } = getState();
    dispatch({
      type: USER_FOLLOW_DELETE_FAILURE,
      payload: {
        ...UsersOnError,
        errors: [...(UsersOnError?.errors || []), error],
      },
    });

    return error;
  }
};
