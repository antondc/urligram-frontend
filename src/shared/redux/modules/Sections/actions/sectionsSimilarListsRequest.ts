import { SECTIONS_SIMILAR_LISTS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsSimilarListsRequest = (): SectionsActions => ({
  type: SECTIONS_SIMILAR_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
