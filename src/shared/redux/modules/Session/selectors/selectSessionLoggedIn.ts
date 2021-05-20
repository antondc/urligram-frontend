import { createSelector } from 'reselect';

import { SESSION_STATUS_ACTIVE, SessionState } from '../session.types';
import { selectSession } from './selectSession';

export const selectSessionLoggedIn = createSelector(
  selectSession,
  (Session: SessionState): boolean => !!Session.id && Session.status === SESSION_STATUS_ACTIVE
);
