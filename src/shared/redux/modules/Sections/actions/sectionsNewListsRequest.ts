import { SECTIONS_NEW_LISTS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsNewListsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_NEW_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
