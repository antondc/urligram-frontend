import { SECTIONS_MY_LISTS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyListsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
