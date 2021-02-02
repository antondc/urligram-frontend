import { SECTIONS_MOST_FOLLOWED_TAGS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsMostFollowedTagsRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_MOST_FOLLOWED_TAGS_REQUEST,
  data: {
    loading: true,
  },
});
