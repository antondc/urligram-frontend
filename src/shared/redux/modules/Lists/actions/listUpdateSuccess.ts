import { LIST_UPDATE_SUCCESS, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listUpdateSuccess = (payload: ListsState): ListsActions => ({
  type: LIST_UPDATE_SUCCESS,
  payload,
});
