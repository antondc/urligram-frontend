import { SECTIONS_NEW_LISTS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewListsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_NEW_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
