import { SECTIONS_FOLLOWING_USERS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsFollowingUsersRequest = (): SectionsActions => ({
  type: SECTIONS_FOLLOWING_USERS_REQUEST,
  data: {
    loading: true,
  },
});
