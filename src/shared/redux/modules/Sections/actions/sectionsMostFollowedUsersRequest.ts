import { SECTIONS_MOST_FOLLOWED_USERS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMostFollowedUsersRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_FOLLOWED_USERS_REQUEST,
  payload,
});
