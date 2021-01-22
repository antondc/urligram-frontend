import { ListsActionsTypes, ListsState, LOAD_LISTS_SUCCESS } from 'Modules/Lists/lists.types';

export const loadListsReceive = (data: ListsState): ListsActionsTypes => ({
  type: LOAD_LISTS_SUCCESS,
  data: {
    ...data,
  },
});
