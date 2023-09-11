import { createSelector } from 'reselect';

import { UsersState, UserState } from '../users.types';
import { selectUsers } from './selectUsers';

const selectUserId = (_, { id }: { id: string }) => id;

export const selectUserById = createSelector(
  selectUsers,
  selectUserId,
  (Users: UsersState, id: string): UserState => Users?.byKey[id]
);
