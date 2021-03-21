import { LIST_CREATE_REQUEST, ListsActionsTypes } from 'Modules/Lists/lists.types';

export const listCreateRequest = (): ListsActionsTypes => ({
  type: LIST_CREATE_REQUEST,
});
