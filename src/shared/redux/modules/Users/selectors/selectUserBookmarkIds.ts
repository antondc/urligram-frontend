import { createSelector } from 'reselect';

import { selectCurrentRouteParamUserId } from '../../Routes/selectors/selectCurrentRouteParamUserId';
import { UsersState } from '../users.types';
import { selectUsersByKey } from './selectUsersByKey';

export const selectUserBookmarkIds = createSelector(
  selectUsersByKey,
  selectCurrentRouteParamUserId,
  (Users: UsersState, userId: string): number[] => Users?.byKey[userId]?.bookmarks
);
