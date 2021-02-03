import { SECTIONS_USERS_IN_THIS_LIST_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsUsersInThisListRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_USERS_IN_THIS_LIST_REQUEST,
  data: {
    loading: true,
  },
});
