import { SECTIONS_MY_LISTS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsMyListsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_MY_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
