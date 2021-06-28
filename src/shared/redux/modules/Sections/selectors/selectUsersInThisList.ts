import { RootState } from 'Modules/rootType';
import { ListUser } from '../../Lists/lists.types';

export const selectUsersInThisList = (state: RootState, { listId }: { listId: number }): ListUser[] =>
  state.Lists.byKey[listId]?.members?.map((item) => ({
    ...state.Users?.byKey[item?.id],
    userRole: item.userRole,
    userStatus: item.userListStatus,
  })) || [];
