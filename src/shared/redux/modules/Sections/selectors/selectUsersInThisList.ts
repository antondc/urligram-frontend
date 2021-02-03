import { RootState } from '../../rootType';
import { UserState } from '../../Users/users.types';

export const selectUsersInThisList = (state: RootState, { listId }: { listId: number }): UserState[] =>
  state.Lists.byKey[listId]?.membersIds?.map((item) => state.Users?.byKey[item]).filter(Boolean);
