import { ListsActionsTypes, LOAD_LISTS_STARTED } from 'Modules/Lists/lists.types';

export const loadListsRequest = (): ListsActionsTypes => ({
  type: LOAD_LISTS_STARTED,
  data: {
    loading: true,
  },
});
