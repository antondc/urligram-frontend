import { SECTIONS_FOLLOWING_USERS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsFollowingUsersRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_FOLLOWING_USERS_REQUEST,
  data: {
    loading: true,
  },
});
