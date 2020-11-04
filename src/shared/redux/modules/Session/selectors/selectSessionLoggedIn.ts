import { createSelector } from 'reselect';

import { SessionState } from '../session.types';
import { selectSession } from './selectSession';

export const selectSessionLoggedIn = createSelector(selectSession, (Session: SessionState): boolean =>
  Session.id ? true : false
);
