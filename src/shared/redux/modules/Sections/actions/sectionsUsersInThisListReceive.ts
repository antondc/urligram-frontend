import { SECTIONS_USERS_IN_THIS_LIST_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUsersInThisListReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_USERS_IN_THIS_LIST_RECEIVE,
  data: {
    ...data,
  },
});
