import { SECTIONS_NEW_USERS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewUsersReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_NEW_USERS_RECEIVE,
  data: {
    ...data,
  },
});
