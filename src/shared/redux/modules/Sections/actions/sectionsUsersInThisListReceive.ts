import {
  SECTIONS_USERS_IN_THIS_LIST_RECEIVE,
  SectionsActionsTypes,
  SectionsState,
} from 'Modules/Sections/sections.types';

export const sectionsUsersInThisListReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_USERS_IN_THIS_LIST_RECEIVE,
  data: {
    ...data,
  },
});
