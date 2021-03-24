import { SECTIONS_USER_LISTS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserListsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_USER_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
