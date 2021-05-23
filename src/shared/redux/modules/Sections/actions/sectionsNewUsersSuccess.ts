import { SECTIONS_NEW_USERS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewUsersSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_NEW_USERS_SUCCESS,
  payload,
});
