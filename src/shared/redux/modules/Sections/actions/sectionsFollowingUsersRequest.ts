import { SECTIONS_FOLLOWING_USERS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingUsersRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWING_USERS_REQUEST,
  payload,
});
