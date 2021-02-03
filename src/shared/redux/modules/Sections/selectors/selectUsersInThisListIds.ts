import { RootState } from '../../rootType';

export const selectUsersInThisListIds = (state: RootState, { listId }: { listId: number }): string[] =>
  state.Lists.byKey[listId]?.membersIds;
