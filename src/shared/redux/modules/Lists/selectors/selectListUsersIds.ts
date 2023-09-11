import { createSelector } from 'reselect';

import { ListsState } from '../lists.types';
import { selectLists } from './selectLists';

const selectListId = (_, { listId }: { listId: number }): number => listId;

export const selectListUsersIds = createSelector(
  selectLists,
  selectListId,
  (Lists: ListsState, listId: number) => Lists.byKey[listId]?.members?.map((item) => item.id) || []
);
