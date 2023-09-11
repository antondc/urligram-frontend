import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { ListsState } from '../lists.types';

export const selectLists = createSelector(
  (state: RootState) => state,
  (state): ListsState => state.Lists
);
