import { SECTIONS_SIMILAR_LISTS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsSimilarListsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_SIMILAR_LISTS_REQUEST,
  payload,
});
