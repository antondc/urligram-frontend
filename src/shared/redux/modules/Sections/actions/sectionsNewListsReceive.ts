import { SECTIONS_NEW_LISTS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewListsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_NEW_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
