import { SECTIONS_USERS_IN_THIS_LIST_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUsersInThisListReceive = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_USERS_IN_THIS_LIST_SUCCESS,
  payload,
});
