import { SECTIONS_FOLLOWERS_USERS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowersUsersReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWERS_USERS_RECEIVE,
  data: {
    ...data,
  },
});
