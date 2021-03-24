import { SECTIONS_MY_LISTS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsMyListsRequest = (): SectionsActions => ({
  type: SECTIONS_MY_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
