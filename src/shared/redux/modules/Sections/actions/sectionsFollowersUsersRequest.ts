import { SECTIONS_FOLLOWERS_USERS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsFollowersUsersRequest = (): SectionsActions => ({
  type: SECTIONS_FOLLOWERS_USERS_REQUEST,
  data: {
    loading: true,
  },
});
