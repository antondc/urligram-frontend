import { SECTIONS_NEW_LISTS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsNewListsRequest = (): SectionsActions => ({
  type: SECTIONS_NEW_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
