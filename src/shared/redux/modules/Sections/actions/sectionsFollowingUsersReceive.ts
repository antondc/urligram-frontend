import { SECTIONS_FOLLOWING_USERS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingUsersReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_FOLLOWING_USERS_RECEIVE,
  data: {
    ...data,
  },
});
