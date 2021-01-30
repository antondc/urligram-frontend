import { SECTIONS_MY_TAGS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsMyTagsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_MY_TAGS_REQUEST,
  data: {
    loading: true,
  },
});
