import { createSelector } from 'reselect';

import { selectUsersAll } from '../../Users/selectors/selectUsersAll';
import { UserState } from '../../Users/users.types';
import { SessionState } from '../session.types';
import { selectSession } from './selectSession';

export const selectSessionUser = createSelector(
  selectSession,
  selectUsersAll,
  (Session: SessionState, Users: UserState[]): SessionState | Record<string, any> =>
    Users.find((item) => item.id === Session.id) || {}
);
