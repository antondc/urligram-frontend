import { LOAD_MOST_POPULAR_LISTS_SUCCESS, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const receivePopularLists = (data: SectionsState): SectionsActionsTypes => ({
  type: LOAD_MOST_POPULAR_LISTS_SUCCESS,
  data: {
    ...data,
  },
});
