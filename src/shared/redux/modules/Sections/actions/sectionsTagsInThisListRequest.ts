import { SECTIONS_TAGS_IN_THIS_LIST_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsTagsInThisListRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_TAGS_IN_THIS_LIST_REQUEST,
  data: {
    loading: true,
  },
});
