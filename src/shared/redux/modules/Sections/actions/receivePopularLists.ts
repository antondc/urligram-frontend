import { LOAD_MOST_POPULAR_LISTS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const receivePopularLists = (data: SectionsState): SectionsActions => ({
  type: LOAD_MOST_POPULAR_LISTS_SUCCESS,
  data: {
    ...data,
  },
});
