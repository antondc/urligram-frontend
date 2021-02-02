import { SECTIONS_USER_LISTS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserListsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_USER_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
