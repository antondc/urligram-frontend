import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveUserResponse } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { receiveUsers } from './receiveUsers';
import { requestUsers } from './requestUsers';

export const userLoad = (userId: string): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(requestUsers());

    const { data: userData }: ReceiveUserResponse = await HttpClient.get('/users/' + userId + window.location.search);

    const { Users } = getState();
    const usersByKey = {
      byKey: {
        ...Users.byKey,
        [userData?.attributes?.id]: {
          ...userData.attributes,
        },
      },
      currentIds: [userData?.attributes?.id],
    };
    dispatch(receiveUsers(usersByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
