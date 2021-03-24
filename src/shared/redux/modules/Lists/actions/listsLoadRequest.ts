import { LISTS_LOAD_REQUEST, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listsLoadRequest = (payload: ListsState): ListsActions => ({
  type: LISTS_LOAD_REQUEST,
  payload,
});
