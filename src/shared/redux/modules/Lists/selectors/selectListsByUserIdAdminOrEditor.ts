import { createSelector } from 'reselect';

import { selectUsers } from '../../Users/selectors/selectUsers';
import { UsersState } from '../../Users/users.types';
import { ListsState, ListState, ListUserRole, ListUserStatus } from '../lists.types';
import { selectLists } from './selectLists';

const selectUserId = (_, { userId }: { userId: string }) => userId;

export const selectListsByUserIdAdminOrEditor = createSelector(
  [selectUsers, selectLists, selectUserId],
  (Users: UsersState, Lists: ListsState, userId): ListState[] =>
    Users?.byKey[userId]?.lists
      .filter(
        (item) =>
          (item?.userRole === ListUserRole.Admin || item?.userRole === ListUserRole.Editor) &&
          item?.userListStatus !== ListUserStatus.Pending
      )
      ?.map((item) => Lists?.byKey[item.id])
);
