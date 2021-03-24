import { SECTIONS_FOLLOWING_LISTS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsFollowingListsRequest = (): SectionsActions => ({
  type: SECTIONS_FOLLOWING_LISTS_REQUEST,
  data: {
    loading: true,
  },
});
