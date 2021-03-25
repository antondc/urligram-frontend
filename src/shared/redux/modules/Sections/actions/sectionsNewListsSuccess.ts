import { SECTIONS_NEW_LISTS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewListsSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_NEW_LISTS_SUCCESS,
  payload,
});
