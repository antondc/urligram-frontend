import { LOAD_MOST_POPULAR_LISTS_STARTED, SectionsActions } from 'Modules/Sections/sections.types';

export const requestPopularLists = (): SectionsActions => ({
  type: LOAD_MOST_POPULAR_LISTS_STARTED,
  data: {
    loading: true,
  },
});
