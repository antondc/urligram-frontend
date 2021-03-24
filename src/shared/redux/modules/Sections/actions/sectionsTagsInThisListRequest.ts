import { SECTIONS_TAGS_IN_THIS_LIST_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsTagsInThisListRequest = (): SectionsActions => ({
  type: SECTIONS_TAGS_IN_THIS_LIST_REQUEST,
  data: {
    loading: true,
  },
});
