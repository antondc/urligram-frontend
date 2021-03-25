import { SECTIONS_MOST_FOLLOWED_USERS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMostFollowedUsersSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_FOLLOWED_USERS_SUCCESS,
  payload,
});
