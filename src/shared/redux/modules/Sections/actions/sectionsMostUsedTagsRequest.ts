import { SECTIONS_MOST_USED_TAGS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMostUsedTagsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_USED_TAGS_REQUEST,
  payload,
});
