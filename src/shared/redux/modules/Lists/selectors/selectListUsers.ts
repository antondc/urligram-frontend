import { RootState } from 'Modules/rootType';
import { ListUser } from '../lists.types';

export const selectListUsers = (state: RootState, { listId }: { listId: number }): ListUser[] =>
  state.Lists.byKey[listId]?.members
    ?.map((item) => ({
      userRole: item.userRole,
      userStatus: item.userListStatus,
      ...state.Users?.byKey[item?.id],
    }))
    .filter((item) => item.id) || [];
