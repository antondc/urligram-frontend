import { SECTIONS_SIMILAR_LISTS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsSimilarListsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_SIMILAR_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
