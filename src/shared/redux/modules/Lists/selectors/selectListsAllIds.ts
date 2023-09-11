import { createSelector } from 'reselect';

import { ListsState } from '../lists.types';
import { selectLists } from './selectLists';

export const selectListsAllIds = createSelector(selectLists, (Lists: ListsState): number[] => Lists?.currentIds);
