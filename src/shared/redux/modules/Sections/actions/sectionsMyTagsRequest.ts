import { SECTIONS_MY_TAGS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsMyTagsRequest = (): SectionsActions => ({
  type: SECTIONS_MY_TAGS_REQUEST,
  data: {
    loading: true,
  },
});
