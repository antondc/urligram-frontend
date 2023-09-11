import { createSelector } from 'reselect';

import { UsersState, UserState } from 'Modules/Users/users.types';
import { selectUsers } from './selectUsers';

export const selectUsersByKey = createSelector(
  selectUsers,
  (Users: UsersState): { [key: string]: UserState } => Users.byKey
);
