import { createSelector } from 'reselect';

import { UsersState, UserState } from '../users.types';
import { selectUsers } from './selectUsers';

const selectUsersIds = (_, { userIds }: { userIds: string[] }) => userIds;

export const selectUsersByIds = createSelector(
  selectUsers,
  selectUsersIds,
  (Users: UsersState, userIds: string[]): UserState[] => userIds?.map((item) => Users?.byKey[item])
);
