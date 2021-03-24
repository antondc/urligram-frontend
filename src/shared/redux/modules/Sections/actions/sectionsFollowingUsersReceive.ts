import { SECTIONS_FOLLOWING_USERS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingUsersReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWING_USERS_RECEIVE,
  data: {
    ...data,
  },
});
