import { RootState } from 'Modules/rootType';

export const selectUsersInThisListIds = (state: RootState, { listId }: { listId: number }): string[] =>
  state.Lists.byKey[listId]?.members.map((item) => item.id);
