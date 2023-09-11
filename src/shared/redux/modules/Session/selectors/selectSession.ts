import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { SessionState } from '../session.types';

export const selectSession = createSelector(
  (state: RootState) => state,
  (state): SessionState => state.Session
);
