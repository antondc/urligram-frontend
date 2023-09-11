import { createSelector } from 'reselect';

import { ListsState, ListState } from '../lists.types';
import { selectLists } from './selectLists';

const selectListId = (_, { id }): number => id;

export const selectListById = createSelector(
  [selectLists, selectListId],
  (Lists: ListsState, id: number): ListState => Lists?.byKey[id]
);
