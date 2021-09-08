import { createSelector } from 'reselect';

import { selectSessionUser } from 'Modules/Session/selectors/selectSessionUser';
import { UserState } from '../users.types';
import { selectUsersAll } from './selectUsersAll';

export const selectUserFollowers = createSelector(
  selectSessionUser,
  selectUsersAll,
  (session: UserState, users: UserState[]): UserState[] =>
    users?.filter((item) => session?.followers?.includes(item.id)) || []
);
