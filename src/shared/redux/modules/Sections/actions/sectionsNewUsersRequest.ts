import { SECTIONS_NEW_USERS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewUsersRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_NEW_USERS_REQUEST,
  payload,
});
