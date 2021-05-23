import { SECTIONS_FOLLOWING_USERS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingUsersSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWING_USERS_SUCCESS,
  payload,
});
