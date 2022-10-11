import { createSelector } from 'reselect';

import { UserState } from 'Modules/Users/users.types';
import { selectUsersByKey } from './selectUsersByKey';
import { selectUsersCurrentIds } from './selectUsersCurrentIds';

export const selectUsersCurrent = createSelector(
  selectUsersByKey,
  selectUsersCurrentIds,
  (usersByKey: Record<string, UserState>, usersCurrentIds: string[]): UserState[] =>
    usersCurrentIds?.map((currentUserId) => usersByKey[currentUserId])
);
