import { SECTIONS_USERS_IN_THIS_LIST_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUsersInThisListRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_USERS_IN_THIS_LIST_REQUEST,
  payload,
});
