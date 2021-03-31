import { LIST_UPDATE_FAILURE, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listUpdateFailure = (payload: ListsState): ListsActions => ({
  type: LIST_UPDATE_FAILURE,
  payload,
});
