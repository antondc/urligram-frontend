import { LIST_CREATE_FAILURE, ListsActionsTypes, ListsError } from 'Modules/Lists/lists.types';

export const listCreateFailure = ({ error }: { error: ListsError }): ListsActionsTypes => ({
  type: LIST_CREATE_FAILURE,
  data: {
    error,
  },
});
