import { SECTIONS_MOST_USED_TAGS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsMostUsedTagsRequest = (): SectionsActions => ({
  type: SECTIONS_MOST_USED_TAGS_REQUEST,
  data: {
    loading: true,
  },
});
