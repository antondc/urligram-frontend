import { createSelector } from 'reselect';

import { selectSessionUser } from 'Modules/Session/selectors/selectSessionUser';
import { UserState } from '../users.types';
import { selectUsersAll } from './selectUsersAll';

export const selectUserFollowing = createSelector(
  selectSessionUser,
  selectUsersAll,
  (session: UserState, users: UserState[]): UserState[] =>
    users?.filter((item) => session?.following?.includes(item.id)) || []
);
