import { LIST_CREATE_FAILURE, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listCreateFailure = (payload: ListsState): ListsActions => ({
  type: LIST_CREATE_FAILURE,
  payload,
});
