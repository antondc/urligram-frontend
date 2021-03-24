import { SECTIONS_MOST_FOLLOWED_USERS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMostFollowedUsersReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_FOLLOWED_USERS_RECEIVE,
  data: {
    ...data,
  },
});
