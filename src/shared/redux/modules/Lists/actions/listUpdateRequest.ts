import { LIST_UPDATE_REQUEST, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listUpdateRequest = (payload: ListsState): ListsActions => ({
  type: LIST_UPDATE_REQUEST,
  payload,
});
