import { RootState } from 'Modules/rootType';
import { UserState } from '../../Users/users.types';

export const selectUsersInThisList = (state: RootState, { listId }: { listId: number }): UserState[] =>
  state.Lists.byKey[listId]?.members?.map((item) => state.Users?.byKey[item?.id]).filter(Boolean);
