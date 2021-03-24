import { SECTIONS_USER_LISTS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsUserListsRequest = (): SectionsActions => ({
  type: SECTIONS_USER_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
