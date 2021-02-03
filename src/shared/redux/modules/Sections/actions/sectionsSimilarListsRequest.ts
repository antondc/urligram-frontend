import { SECTIONS_SIMILAR_LISTS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsSimilarListsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_SIMILAR_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
