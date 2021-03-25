import { SECTIONS_USER_MOST_USED_TAGS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserMostUsedTagsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_USER_MOST_USED_TAGS_REQUEST,
  payload,
});
