import { SECTIONS_USERS_IN_THIS_LIST_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsUsersInThisListRequest = (): SectionsActions => ({
  type: SECTIONS_USERS_IN_THIS_LIST_REQUEST,
  data: {
    loading: true,
  },
});
