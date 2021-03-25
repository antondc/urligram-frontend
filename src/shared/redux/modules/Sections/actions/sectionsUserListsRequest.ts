import { SECTIONS_USER_LISTS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserListsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_USER_LISTS_REQUEST,
  payload,
});
