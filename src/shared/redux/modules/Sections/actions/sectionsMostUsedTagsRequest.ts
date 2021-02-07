import { SECTIONS_MOST_USED_TAGS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsMostUsedTagsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_MOST_USED_TAGS_REQUEST,
  data: {
    loading: true,
  },
});
