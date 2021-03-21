import { LIST_CREATE_SUCCESS, ListsActionsTypes, ListState } from 'Modules/Lists/lists.types';

export const listCreateSuccess = ({ list }: { list: ListState }): ListsActionsTypes => ({
  type: LIST_CREATE_SUCCESS,
  data: {
    list,
  },
});
