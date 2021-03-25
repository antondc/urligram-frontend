import { SECTIONS_MY_LISTS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyListsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_LISTS_REQUEST,
  payload,
});
