import { SECTIONS_SIMILAR_LISTS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsSimilarListsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_SIMILAR_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
