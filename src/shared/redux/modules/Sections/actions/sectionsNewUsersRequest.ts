import { SECTIONS_NEW_USERS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsNewUsersRequest = (): SectionsActions => ({
  type: SECTIONS_NEW_USERS_REQUEST,
  data: {
    loading: true,
  },
});
