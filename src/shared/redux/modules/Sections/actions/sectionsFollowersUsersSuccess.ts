import { SECTIONS_FOLLOWERS_USERS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowersUsersSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWERS_USERS_SUCCESS,
  payload,
});
