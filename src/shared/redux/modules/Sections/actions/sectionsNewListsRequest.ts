import { SECTIONS_NEW_LISTS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewListsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_NEW_LISTS_REQUEST,
  payload,
});
