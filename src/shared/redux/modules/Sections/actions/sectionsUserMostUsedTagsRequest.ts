import { SECTIONS_USER_MOST_USED_TAGS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsUserMostUsedTagsRequest = (): SectionsActions => ({
  type: SECTIONS_USER_MOST_USED_TAGS_REQUEST,
  data: {
    loading: true,
  },
});
