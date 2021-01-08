import { LOAD_MOST_POPULAR_LISTS_STARTED, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const requestPopularLists = (): SectionsActionsTypes => ({
  type: LOAD_MOST_POPULAR_LISTS_STARTED,
  data: {
    loading: true,
  },
});
