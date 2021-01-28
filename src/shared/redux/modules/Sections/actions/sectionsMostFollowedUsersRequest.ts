import { SECTIONS_MOST_FOLLOWED_USERS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsMostFollowedUsersRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_MOST_FOLLOWED_USERS_REQUEST,
  data: {
    loading: true,
  },
});
