import {
  SECTIONS_MOST_FOLLOWED_USERS_RECEIVE,
  SectionsActionsTypes,
  SectionsState,
} from 'Modules/Sections/sections.types';

export const sectionsMostFollowedUsersReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_MOST_FOLLOWED_USERS_RECEIVE,
  data: {
    ...data,
  },
});
