import { SECTIONS_USER_MOST_USED_TAGS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsUserMostUsedTagsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_USER_MOST_USED_TAGS_REQUEST,
  data: {
    loading: true,
  },
});
