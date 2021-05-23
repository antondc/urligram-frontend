import { SECTIONS_MY_LISTS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyListsSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_LISTS_SUCCESS,
  payload,
});
