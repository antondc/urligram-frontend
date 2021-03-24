import { SECTIONS_MOST_FOLLOWED_USERS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsMostFollowedUsersRequest = (): SectionsActions => ({
  type: SECTIONS_MOST_FOLLOWED_USERS_REQUEST,
  data: {
    loading: true,
  },
});
