import { createSelector } from 'reselect';

import { UsersState, UserState } from 'Modules/Users/users.types';
import { selectUsers } from './selectUsers';

export const selectUsersAll = createSelector(selectUsers, (Users: UsersState): UserState[] =>
  Object.values(Users.byKey)
);
