import { SECTIONS_FOLLOWERS_USERS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsFollowersUsersRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_FOLLOWERS_USERS_REQUEST,
  data: {
    loading: true,
  },
});
