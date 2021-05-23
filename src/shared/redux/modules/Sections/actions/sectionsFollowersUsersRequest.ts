import { SECTIONS_FOLLOWERS_USERS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowersUsersRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWERS_USERS_REQUEST,
  payload,
});
