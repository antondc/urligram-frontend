import { createSelector } from 'reselect';

import { selectUsers } from '../../Users/selectors/selectUsers';
import { UsersState } from '../../Users/users.types';
import { ListsState, ListUser } from '../lists.types';
import { selectLists } from './selectLists';

const selectListId = (_, { listId }: { listId: number }): number => listId;

export const selectListUsers = createSelector(
  selectLists,
  selectUsers,
  selectListId,
  (Lists: ListsState, Users: UsersState, listId): ListUser[] =>
    Lists.byKey[listId]?.members
      ?.map((item) => ({
        userRole: item.userRole,
        userStatus: item.userListStatus,
        ...Users?.byKey[item?.id],
      }))
      .filter((item) => item.id) || []
);
