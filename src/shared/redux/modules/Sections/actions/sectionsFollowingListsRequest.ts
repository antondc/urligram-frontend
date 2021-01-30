import { SECTIONS_FOLLOWING_LISTS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsFollowingListsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_FOLLOWING_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
