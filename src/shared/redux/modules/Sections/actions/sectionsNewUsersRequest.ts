import { SECTIONS_NEW_USERS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsNewUsersRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_NEW_USERS_REQUEST,
  data: {
    loading: true,
  },
});
