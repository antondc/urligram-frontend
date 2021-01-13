import { createSelector } from 'reselect';

import { SessionState } from '../session.types';
import { selectSession } from './selectSession';

export const selectSessionUserId = createSelector(selectSession, (Session: SessionState): string => Session.id);
