import { createSelector } from 'reselect';

import { UserStatus } from '../../Users/users.types';
import { SessionState } from '../session.types';
import { selectSession } from './selectSession';

export const selectSessionLoggedIn = createSelector(
  selectSession,
  (session: SessionState): boolean => !!session.id && session.status === UserStatus.Active
);
