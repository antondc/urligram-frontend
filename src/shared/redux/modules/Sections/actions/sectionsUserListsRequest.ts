import { SECTIONS_USER_LISTS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsUserListsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_USER_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
