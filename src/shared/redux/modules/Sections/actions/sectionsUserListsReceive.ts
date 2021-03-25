import { SECTIONS_USER_LISTS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserListsReceive = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_USER_LISTS_SUCCESS,
  payload,
});
