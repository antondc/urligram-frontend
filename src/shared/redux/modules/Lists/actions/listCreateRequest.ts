import { LIST_CREATE_REQUEST, ListsActions, ListsState } from 'Modules/Lists/lists.types';

export const listCreateRequest = (payload: ListsState): ListsActions => ({
  type: LIST_CREATE_REQUEST,
  payload,
});
