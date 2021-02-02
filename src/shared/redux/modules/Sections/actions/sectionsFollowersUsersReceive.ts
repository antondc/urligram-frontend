import { SECTIONS_FOLLOWERS_USERS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowersUsersReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_FOLLOWERS_USERS_RECEIVE,
  data: {
    ...data,
  },
});
