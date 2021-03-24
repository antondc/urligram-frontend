import { LISTS_LOAD_SUCCESS, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listsLoadReceive = (payload: ListsState): ListsActions => ({
  type: LISTS_LOAD_SUCCESS,
  payload,
});
