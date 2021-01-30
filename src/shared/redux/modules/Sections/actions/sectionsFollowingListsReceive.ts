import { SECTIONS_FOLLOWING_LISTS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingListsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_FOLLOWING_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
