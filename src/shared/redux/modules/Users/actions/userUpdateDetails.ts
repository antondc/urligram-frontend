import { SessionState } from 'Modules/Session/session.types';
import { AppThunk } from '../../..';
import { USER_UPDATE_DETAILS, UsersActions } from '../users.types';

export const userUpdateDetails = (userDetails: Partial<SessionState>): AppThunk<void, UsersActions> => (
  dispatch,
  getState
): void => {
  const { Users } = getState();

  dispatch({
    type: USER_UPDATE_DETAILS,
    payload: {
      ...Users,
      byKey: {
        ...Users.byKey,
        [userDetails.id]: {
          ...Users.byKey[userDetails?.id],
          ...userDetails,
        },
      },
    },
  });
};
