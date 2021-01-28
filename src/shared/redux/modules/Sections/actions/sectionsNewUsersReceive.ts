import { SECTIONS_NEW_USERS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsNewUsersReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_NEW_USERS_RECEIVE,
  data: {
    ...data,
  },
});
