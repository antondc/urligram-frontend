import { LIST_CREATE_SUCCESS, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listCreateSuccess = (payload: ListsState): ListsActions => ({
  type: LIST_CREATE_SUCCESS,
  payload,
});
