import { SECTIONS_SIMILAR_LISTS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsSimilarListsSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_SIMILAR_LISTS_SUCCESS,
  payload,
});
