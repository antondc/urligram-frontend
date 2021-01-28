import { SECTIONS_MY_LISTS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyListsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_MY_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
